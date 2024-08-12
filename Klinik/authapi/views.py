from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .models import *
from .serializers import *
from .utils import send_email
from .renderers import UserRenderer
import random
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import jwt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView


# Generate Token Manually
def get_tokens_for_user(user_obj):
  refresh = RefreshToken.for_user(user_obj)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }


class UserRegisterView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [permissions.AllowAny, ]
    
    def post(self, request):
        serializer = UserRegesterationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            email = serializer.validated_data["email"]
            user = CustomUser.objects.get(email=email)
            otp = random.randint(100000, 999999)
            data = {"detail": f"Hi {user.first_name} thanks for signing up. Please verify your email with the \n one time passcode {otp}", "email": email}
            token = get_tokens_for_user(user)
            send_email("Activate your account!", user.email, {
                "user": user}, {"token": token})
            return Response(data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyUserEmail(APIView):
    renderer_classes = [UserRenderer]
    
    def post(self, request):
        try:
            passcode = request.data.get('otp')
            user_pass_obj = OneTimePassword.objects.get(otp=passcode)
            user = user_pass_obj.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({
                    'message': 'account email verified successfully'
                }, status=status.HTTP_200_OK)
            return Response({'message': 'passcode is invalid user is already verified'}, status=status.HTTP_204_NO_CONTENT)
        except OneTimePassword.DoesNotExist as identifier:
            return Response({'message': 'passcode not provided'}, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [permissions.AllowAny, ]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LogOutView(APIView):
    serializer_class = LogoutSerializer
    renderer_classes = [UserRenderer]
    permission_classes = [permissions.AllowAny, ]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            print(refresh_token)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'success': 'Loged Out'}, status=status.HTTP_200_OK)
        except:
            return Response({'Error': 'something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordApiView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated,]

    def put(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("current_password")):
                return Response(
                    {"current Password": "Wrong password"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            self.object.set_password(serializer.data.get("password"))
            self.object.save()
            return Response(
                {"details": "Password changed successfully"},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_qs = CustomUser.objects.filter(email=serializer.data['email'])
        if user_qs.exists():
            user = user_qs[0]
            token = PasswordResetTokenGenerator().make_token(user)
            send_email("User Email", user.email, {
                "user": user}, {"token": token})
            return Response({"message": "Email sent for password reset"}, status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    renderer_classes = [UserRenderer]
    
    def post(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'password has sucessfuly reset'}, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:
            query = UserProfile.objects.get(user=request.user)
            serializer = ProfileSerializer(query)
            response_message = {"error": False, "data": serializer.data}
        except Exception as e:
            print(e)
            response_message = {"error": True,
                                "message": "Something went Wrong"}
        return Response(response_message)


class UpdateUserProfile(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            user = request.user
            query = CustomUser.objects.get(user=user)
            data = request.data
            serializers = ProfileSerializer(
                query, data=data, context={"request": request})
            serializers.is_valid(raise_exception=True)
            serializers.save()
            return_res = {"message": "Profile is Updated"}
        except Exception as e:
            print(e)
            return_res = {"message": "Something went Wrong Try Again!!!"}
        return Response(return_res)
