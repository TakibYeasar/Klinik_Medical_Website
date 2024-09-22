from django.db import models
from django.shortcuts import reverse
from django.utils.text import slugify
from doctors.models import Doctor
from django.core.exceptions import ValidationError
from django.utils import timezone

# Create your models here.

class Patient(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    IDENTIFICATION_CHOICES = [
        ('Birth Certificate', 'Birth Certificate'),
        ('Passport', 'Passport'),
        ('Driver License', 'Driver License'),
        ('Medical Insurance Card/Policy', 'Medical Insurance Card/Policy'),
        ('Military ID Card', 'Military ID Card'),
        ('National Identity Card', 'National Identity Card'),
        ('Resident Alien Card (Green Card)', 'Resident Alien Card (Green Card)'),
        ('Social Security Card', 'Social Security Card'),
        ('State ID Card', 'State ID Card'),
        ('Student ID Card', 'Student ID Card'),
        ('Voter ID Card', 'Voter ID Card'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=15)
    birth_date = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='Male')
    address = models.TextField()
    occupation = models.CharField(max_length=100, blank=True)
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_number = models.CharField(max_length=15)
    primary_physician = models.CharField(max_length=100, blank=True)
    insurance_provider = models.CharField(max_length=100, blank=True)
    insurance_policy_number = models.CharField(max_length=100, blank=True)
    allergies = models.TextField(blank=True)
    current_medication = models.TextField(blank=True)
    family_medical_history = models.TextField(blank=True)
    past_medical_history = models.TextField(blank=True)
    identification_type = models.CharField(max_length=50, choices=IDENTIFICATION_CHOICES, default='Birth Certificate')
    identification_number = models.CharField(max_length=100)
    identification_document = models.FileField(upload_to='identification_documents/', blank=True, null=True)
    treatment_consent = models.BooleanField(default=False)
    disclosure_consent = models.BooleanField(default=False)
    privacy_consent = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled'),
    ]

    patient = models.ForeignKey(
        'Patient', on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey('doctors.Doctor', on_delete=models.CASCADE,
                               related_name='appointments')  # Updated reference
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    reason = models.TextField()
    note = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='scheduled')
    cancellation_reason = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Appointments'
        constraints = [
            models.UniqueConstraint(fields=[
                                    'doctor', 'appointment_date', 'appointment_time'], name='unique_appointment'),
        ]

    def clean(self):
        # Validate that the appointment date is not in the past
        if self.appointment_date < timezone.now().date() or \
           (self.appointment_date == timezone.now().date() and self.appointment_time < timezone.now().time()):
            raise ValidationError(
                "The appointment date and time cannot be in the past.")

    def __str__(self):
        return f"Appointment with {self.doctor} on {self.appointment_date} at {self.appointment_time}"


class Medication(models.Model):
    name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=100)
    frequency = models.CharField(max_length=100)
    patient = models.ForeignKey(
        'Patient', on_delete=models.CASCADE, related_name='medications')

    def __str__(self):
        return self.name


class MedicalRecord(models.Model):
    patient = models.ForeignKey(
        'Patient', on_delete=models.CASCADE, related_name='records')
    description = models.TextField()
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Record for {self.patient} on {self.date_created}"

