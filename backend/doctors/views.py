# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Doctor
from .serializers import DoctorSerializer

class DoctorListCreateAPIView(APIView):
    def get(self, request):
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            doctor = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorDetailAPIView(APIView):
    def get_object(self, id):
        try:
            return Doctor.objects.get(id=id)
        except Doctor.DoesNotExist:
            return None

    def get(self, request, id):
        doctor = self.get_object(id)
        if doctor is None:
            return Response({"detail": "Doctor not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)

    def put(self, request, id):
        doctor = self.get_object(id)
        if doctor is None:
            return Response({"detail": "Doctor not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = DoctorSerializer(doctor, data=request.data)
        if serializer.is_valid():
            doctor = serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        doctor = self.get_object(id)
        if doctor is None:
            return Response({"detail": "Doctor not found."}, status=status.HTTP_404_NOT_FOUND)
        
        doctor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
