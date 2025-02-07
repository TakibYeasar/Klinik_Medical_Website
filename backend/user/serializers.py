from rest_framework import serializers
from .models import Doctor, Patient, Feedback, Newsletter


class DoctorSerializer(serializers.ModelSerializer):
    user_full_name = serializers.CharField(
        source='user.get_full_name', read_only=True)

    class Meta:
        model = Doctor
        fields = [
            'id', 'user', 'user_full_name', 'image', 'department', 'specialization',
            'biography', 'experience_years', 'qualifications', 'achievements',
            'languages_spoken', 'consultation_fees', 'available_days',
            'available_time_from', 'available_time_to', 'contact_number', 'social_links',
            'slug', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']


class PatientSerializer(serializers.ModelSerializer):
    user_full_name = serializers.CharField(
        source='user.get_full_name', read_only=True)

    class Meta:
        model = Patient
        fields = [
            'id', 'user', 'user_full_name', 'birth_date', 'gender', 'address', 'occupation',
            'marital_status', 'blood_type', 'nationality', 'languages_spoken',
            'emergency_contact_name', 'emergency_contact_number', 'emergency_contact_relationship',
            'insurance_provider', 'insurance_policy_number', 'allergies',
            'current_medication', 'past_medical_history', 'smoking_status',
            'alcohol_use', 'weight', 'height', 'treatment_consent', 'privacy_consent'
        ]


class FeedbackSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source='patient.user.get_full_name', read_only=True)
    doctor_name = serializers.CharField(
        source='doctor.user.get_full_name', read_only=True)

    class Meta:
        model = Feedback
        fields = [
            'id', 'patient', 'patient_name', 'doctor', 'doctor_name', 'feedback_text',
            'doctor_response', 'rating', 'created_at'
        ]
        read_only_fields = ['created_at']


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ['id', 'email', 'created_at']

