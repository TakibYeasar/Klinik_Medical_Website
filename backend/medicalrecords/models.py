from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from user.models import Patient, Doctor

class Referral(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled'),
    ]

    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name='referrals')
    specialist = models.ForeignKey(
        Doctor, on_delete=models.SET_NULL, null=True, related_name='referrals_received')
    reason = models.TextField()
    referral_date = models.DateField(auto_now_add=True)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='pending')
    referral_document = models.FileField(upload_to='referrals/', blank=True, null=True)

    class Meta:
        ordering = ['-referral_date']

    def __str__(self):
        return f"Referral for {self.patient.user.get_full_name()} to {self.specialist.user.get_full_name()}"


class VisitNote(models.Model):
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name='visit_notes')
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name='doctor_notes')
    notes = models.TextField()
    visit_date = models.DateField(auto_now_add=True)
    additional_files = models.FileField(upload_to='visit_notes/', blank=True, null=True)

    class Meta:
        ordering = ['-visit_date']

    def __str__(self):
        return f"Visit note for {self.patient.user.get_full_name()} on {self.visit_date}"

class LabTest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled'),
    ]

    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name='lab_tests')
    test_name = models.CharField(max_length=255)
    instructions = models.TextField()
    date_ordered = models.DateField(auto_now_add=True)
    results = models.TextField(blank=True, null=True)
    result_date = models.DateField(blank=True, null=True)
    status = models.CharField(
        max_length=15, choices=STATUS_CHOICES, default='pending')
    lab_report = models.FileField(upload_to='lab_tests/', blank=True, null=True)

    class Meta:
        ordering = ['-date_ordered']

    def __str__(self):
        return f"Lab test for {self.patient.user.get_full_name()} - {self.test_name}"

class MedicalRecord(models.Model):
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name='medical_records')
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name='doctor_records')
    prescription = models.FileField(upload_to='prescriptions/', blank=True, null=True)
    referral = models.ForeignKey(Referral, on_delete=models.SET_NULL,
                                 related_name='referred_records', blank=True, null=True)
    lab_test = models.ForeignKey(
        LabTest, on_delete=models.SET_NULL, related_name='lab_test_records', blank=True, null=True)
    visit_note = models.ForeignKey(
        VisitNote, on_delete=models.SET_NULL, related_name='visit_note_records', blank=True, null=True)
    next_followup_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    medical_documents = models.FileField(upload_to='medical_records/', blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def clean(self):
        """ Ensure follow-up date is not in the past """
        if self.next_followup_date and self.next_followup_date < timezone.now().date():
            raise ValidationError("Next follow-up date cannot be in the past.")

    def __str__(self):
        return f"Medical record for {self.patient.user.get_full_name()} with Dr. {self.doctor.user.get_full_name()}"


