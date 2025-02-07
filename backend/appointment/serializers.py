from rest_framework import serializers
from .models import *


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ['slug', 'created_at', 'updated_at']

    def validate(self, data):
        """ Ensure valid appointment date and time """
        today = timezone.now().date()
        if data['date'] < today:
            raise serializers.ValidationError("Appointment date cannot be in the past.")
        if data['date'] == today and data['time'] < timezone.now().time():
            raise serializers.ValidationError("Appointment time cannot be in the past.")
        return data


