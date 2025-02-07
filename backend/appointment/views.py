from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Appointment, Doctor
from .serializers import AppointmentSerializer


class AppointmentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AppointmentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AppointmentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug):
        appointment = get_object_or_404(Appointment, slug=slug)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AppointmentUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, slug):
        appointment = get_object_or_404(Appointment, slug=slug)
        serializer = AppointmentSerializer(
            appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AppointmentDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, slug):
        appointment = get_object_or_404(Appointment, slug=slug)
        appointment.delete()
        return Response({'message': 'Appointment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class ManageAppointmentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug):
        """
        Retrieve all appointments for a specific doctor.
        """
        doctor = get_object_or_404(Doctor, slug=slug)
        appointments = Appointment.objects.filter(doctor=doctor)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, slug):
        """
        Create a new appointment for a specific doctor.
        """
        doctor = get_object_or_404(Doctor, slug=slug)
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(doctor=doctor)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, slug, appointment_id):
        """
        Update or reschedule an appointment.
        """
        doctor = get_object_or_404(Doctor, slug=slug)
        appointment = get_object_or_404(
            Appointment, id=appointment_id, doctor=doctor)
        serializer = AppointmentSerializer(
            appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, appointment_id):
        """
        Cancel an appointment.
        """
        doctor = get_object_or_404(Doctor, slug=slug)
        appointment = get_object_or_404(
            Appointment, id=appointment_id, doctor=doctor)
        appointment.status = 'Canceled'
        appointment.save()
        return Response({"message": "Appointment canceled"}, status=status.HTTP_204_NO_CONTENT)


