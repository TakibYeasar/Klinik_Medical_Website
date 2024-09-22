# views.py
from .serializers import MedicationSerializer
from .models import Medication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer

# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *


class RegisterPatientAPIView(APIView):
    def post(self, request):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            patient = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetPatientAPIView(APIView):
    def get(self, request, user_id):
        try:
            patient = Patient.objects.get(user_id=user_id)  # Assuming you have a field to link the user
            serializer = PatientSerializer(patient)
            return Response(serializer.data)
        except Patient.DoesNotExist:
            return Response({"detail": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)


class AppointmentListCreateAPIView(APIView):
    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            appointment = serializer.save()
            # Call function to send SMS here if necessary
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AppointmentDetailAPIView(APIView):
    def get_object(self, appointment_id):
        try:
            return Appointment.objects.get(id=appointment_id)
        except Appointment.DoesNotExist:
            return None

    def get(self, request, appointment_id):
        appointment = self.get_object(appointment_id)
        if appointment is None:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)

    def put(self, request, appointment_id):
        appointment = self.get_object(appointment_id)
        if appointment is None:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = AppointmentSerializer(appointment, data=request.data)
        if serializer.is_valid():
            appointment = serializer.save()
            # Call function to send SMS here if necessary
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, appointment_id):
        appointment = self.get_object(appointment_id)
        if appointment is None:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MedicationListCreateAPIView(APIView):
    def get(self, request):
        medications = Medication.objects.all()
        serializer = MedicationSerializer(medications, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MedicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MedicationDetailAPIView(APIView):
    def get_object(self, id):
        try:
            return Medication.objects.get(id=id)
        except Medication.DoesNotExist:
            return None

    def get(self, request, id):
        medication = self.get_object(id)
        if medication is None:
            return Response({"detail": "Medication not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = MedicationSerializer(medication)
        return Response(serializer.data)

    def put(self, request, id):
        medication = self.get_object(id)
        if medication is None:
            return Response({"detail": "Medication not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = MedicationSerializer(medication, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        medication = self.get_object(id)
        if medication is None:
            return Response({"detail": "Medication not found."}, status=status.HTTP_404_NOT_FOUND)
        medication.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MedicalRecordListCreateAPIView(APIView):
    def get(self, request):
        records = MedicalRecord.objects.all()
        serializer = MedicalRecordSerializer(records, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MedicalRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MedicalRecordDetailAPIView(APIView):
    def get_object(self, id):
        try:
            return MedicalRecord.objects.get(id=id)
        except MedicalRecord.DoesNotExist:
            return None

    def get(self, request, id):
        record = self.get_object(id)
        if record is None:
            return Response({"detail": "Record not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = MedicalRecordSerializer(record)
        return Response(serializer.data)

    def put(self, request, id):
        record = self.get_object(id)
        if record is None:
            return Response({"detail": "Record not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = MedicalRecordSerializer(record, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        record = self.get_object(id)
        if record is None:
            return Response({"detail": "Record not found."}, status=status.HTTP_404_NOT_FOUND)
        record.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


