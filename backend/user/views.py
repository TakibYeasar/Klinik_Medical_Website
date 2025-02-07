from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from authapi.serializers import UserRegisterSerializer
from authapi.utils import send_email
from medicalrecords.models import *
from medicalrecords.serializers import *
from .models import *
from .serializers import *


class DoctorProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug):
        doctor = get_object_or_404(Doctor, slug=slug)
        serializer = DoctorSerializer(doctor, context={'request': request})
        return Response(serializer.data)

    def put(self, request, slug):
        doctor = get_object_or_404(Doctor, slug=slug)
        serializer = DoctorSerializer(
            doctor, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminManageDoctorsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        doctors = CustomUser.objects.filter(role='doctor')
        serializer = UserRegisterSerializer(doctors, many=True)
        return Response({'doctors': serializer.data})

    def patch(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id, role='doctor')
        is_approved = request.data.get('is_approved')
        if is_approved is not None:
            user.is_approved = is_approved
            user.save()
            return Response({'message': 'Doctor approval status updated successfully'}, status=status.HTTP_200_OK)
        return Response({'message': 'No approval status provided'}, status=status.HTTP_400_BAD_REQUEST)


class AdminApprovedDoctorsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        approved_doctors = CustomUser.objects.filter(
            role='doctor', is_approved=True)
        serializer = UserRegisterSerializer(approved_doctors, many=True)
        return Response({'approved_doctors': serializer.data})


class PatientManagementView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, patient_id, action_type=None):
        patient = get_object_or_404(Patient, id=patient_id)
        serializer_class = {
            "medical_records": MedicalRecordSerializer,
            "referrals": ReferralSerializer,
            "visit_notes": VisitNoteSerializer,
            "lab_tests": LabTestSerializer,
        }.get(action_type)

        if not serializer_class:
            return Response({"error": "Invalid action type."}, status=status.HTTP_400_BAD_REQUEST)

        records = serializer_class.Meta.model.objects.filter(
            medicalrecord__patient=patient)
        serializer = serializer_class(records, many=True)
        return Response(serializer.data)

    def post(self, request, patient_id, action_type=None):
        patient = get_object_or_404(Patient, id=patient_id)
        serializer_class = {
            "medical_record": MedicalRecordSerializer,
            "referral": ReferralSerializer,
            "visit_note": VisitNoteSerializer,
            "lab_test": LabTestSerializer,
        }.get(action_type)

        if not serializer_class:
            return Response({"error": "Invalid action type."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PatientFeedbackView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        feedbacks = Feedback.objects.filter(patient=request.user.patient)
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(patient=request.user.patient)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorFeedbackView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve all feedback entries for the logged-in doctor.
        """
        feedbacks = Feedback.objects.filter(doctor=request.user.doctor)
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        feedback_id = request.data.get('feedback_id')
        doctor_response = request.data.get('doctor_response')

        if not feedback_id or not doctor_response:
            return Response(
                {"error": "Feedback ID and doctor response are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        feedback = get_object_or_404(
            Feedback, id=feedback_id, doctor=request.user.doctor)
        feedback.doctor_response = doctor_response
        feedback.save()

        return Response(FeedbackSerializer(feedback).data, status=status.HTTP_200_OK)

class NewsletterSubscriptionView(APIView):
    def post(self, request):
        serializer = NewsletterSerializer(data=request.data)
        if serializer.is_valid():
            if Newsletter.objects.filter(email=serializer.validated_data['email']).exists():
                return Response({'message': 'This email is already subscribed.'}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            send_email('Welcome to our Newsletter!', 'Thank you for subscribing!',
                       settings.DEFAULT_FROM_EMAIL, [serializer.validated_data['email']])
            return Response({'message': 'Successfully subscribed!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NewsletterUnsubscriptionView(APIView):
    def post(self, request):
        email = request.data.get('email')
        subscriber = Newsletter.objects.filter(email=email).first()
        if not subscriber:
            return Response({'error': 'This email is not subscribed.'}, status=status.HTTP_404_NOT_FOUND)
        subscriber.delete()
        return Response({'message': 'Successfully unsubscribed.'})


class SendNewsletterView(APIView):
    def post(self, request):
        subject, message = request.data.get(
            'subject'), request.data.get('message')
        if not subject or not message:
            return Response({'error': 'Subject and message required.'}, status=status.HTTP_400_BAD_REQUEST)

        recipients = Newsletter.objects.values_list('email', flat=True)
        send_email(subject, message, settings.DEFAULT_FROM_EMAIL, recipients)
        return Response({'message': 'Newsletter sent!'}, status=status.HTTP_200_OK)


