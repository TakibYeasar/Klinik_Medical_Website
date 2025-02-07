from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import PermissionDenied
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail

# Create your views here.


class GetContactInfoView(APIView):
    def get(self, request):
        try:
            info_obj = Contactinfo.objects.all()
            serializer = ContactinfoSerializer(
                info_obj, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No Contactinfo found"}, status=status.HTTP_404_NOT_FOUND)


class CreateContactInfoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create contact info.")
            
        serializer = ContactinfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateContactInfoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update contact info.")
            
        try:
            info_obj = Contactinfo.objects.get(pk=pk)
            serializer = ContactinfoSerializer(
                info_obj, context={'request': request}, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No Contactinfo found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteContactInfoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete contact info.")
            
        try:
            info_obj = Contactinfo.objects.get(pk=pk)
            info_obj.delete()
            return Response({'message': 'Contact info deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No Contactinfo found"}, status=status.HTTP_404_NOT_FOUND)


class BannerView(APIView):
    def get(self, request):
        try:
            banner_obj = Banner.objects.all()
            banner_serializer = BannerSerializer(
                banner_obj, many=True, context={'request': request}).data
            return Response(banner_serializer, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'No banner found'}, status=status.HTTP_404_NOT_FOUND)


class CreateBannerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create a banner.")

        serializer = BannerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateBannerView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update a banner.")

        try:
            banner_obj = Banner.objects.get(pk=pk)
            serializer = BannerSerializer(
                banner_obj, data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No banner found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteBannerView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete a banner.")

        try:
            banner_obj = Banner.objects.get(pk=pk)
            banner_obj.delete()
            return Response({'message': 'Banner deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No banner found"}, status=status.HTTP_404_NOT_FOUND)


class ServiceView(APIView):
    def get(self, request):
        try:
            service_obj = Service.objects.all()
            service_serializer = ServiceSerializer(
                service_obj, many=True, context={'request': request}).data
            return Response(service_serializer, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response({'error': 'No service found'}, status=status.HTTP_404_NOT_FOUND)


class CreateServiceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create a service.")

        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateServiceView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update a service.")

        try:
            service_obj = Service.objects.get(pk=pk)
            serializer = ServiceSerializer(
                service_obj, data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No service found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteServiceView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete a service.")

        try:
            service_obj = Service.objects.get(pk=pk)
            service_obj.delete()
            return Response({'message': 'Service deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No service found"}, status=status.HTTP_404_NOT_FOUND)

class ContactView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request, format=None):
        data = self.request.data
        response = 'You will be contacted shortly.'

        try:
            send_mail(data['subject'],
                      'Name: ' + data['name'] + '\nEmail: ' + data['email'] +
                      '\n\nMessage:\n' + data['message'] + '\n\n' + response,
                      '19bcp101.nepal@gmail.com',
                      [data['email'], 'nothing3669@gmail.com'],
                      fail_silently=False)

            contact = Contact(name=data['name'],
                              email=data['email'],
                              subject=data['subject'],
                              message=data['message'])
            contact.save()

            return Response({'success': 'Message sent successfully'})

        except:
            return Response({'error': 'Message failed to send'})

