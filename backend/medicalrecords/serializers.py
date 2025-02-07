from rest_framework import serializers
from .models import Referral, VisitNote, LabTest, MedicalRecord


class ReferralSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source='patient.user.get_full_name', read_only=True)
    specialist_name = serializers.CharField(
        source='specialist.user.get_full_name', read_only=True)

    class Meta:
        model = Referral
        fields = [
            'id', 'patient', 'patient_name', 'specialist', 'specialist_name',
            'reason', 'referral_date', 'status', 'referral_document'
        ]
        read_only_fields = ['referral_date']


class VisitNoteSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source='patient.user.get_full_name', read_only=True)
    doctor_name = serializers.CharField(
        source='doctor.user.get_full_name', read_only=True)

    class Meta:
        model = VisitNote
        fields = [
            'id', 'patient', 'patient_name', 'doctor', 'doctor_name',
            'notes', 'visit_date', 'additional_files'
        ]
        read_only_fields = ['visit_date']


class LabTestSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source='patient.user.get_full_name', read_only=True)

    class Meta:
        model = LabTest
        fields = [
            'id', 'patient', 'patient_name', 'test_name', 'instructions',
            'date_ordered', 'results', 'result_date', 'status', 'lab_report'
        ]
        read_only_fields = ['date_ordered']


class MedicalRecordSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source='patient.user.get_full_name', read_only=True)
    doctor_name = serializers.CharField(
        source='doctor.user.get_full_name', read_only=True)
    referral_details = ReferralSerializer(source='referral', read_only=True)
    lab_test_details = LabTestSerializer(source='lab_test', read_only=True)
    visit_note_details = VisitNoteSerializer(
        source='visit_note', read_only=True)

    class Meta:
        model = MedicalRecord
        fields = [
            'id', 'patient', 'patient_name', 'doctor', 'doctor_name',
            'prescription', 'referral', 'referral_details', 'lab_test', 'lab_test_details',
            'visit_note', 'visit_note_details', 'next_followup_date', 'created_at', 'updated_at',
            'medical_documents'
        ]
        read_only_fields = ['created_at', 'updated_at']
