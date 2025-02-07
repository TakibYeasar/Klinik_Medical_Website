from django.db import models
from authapi.models import CustomUser
from django.utils.text import slugify

class Doctor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='doctors/', blank=True, null=True)
    department = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255)
    biography = models.TextField(blank=True, null=True)
    experience_years = models.PositiveIntegerField()
    qualifications = models.TextField()
    achievements = models.TextField(blank=True, null=True)
    languages_spoken = models.CharField(max_length=255)
    consultation_fees = models.DecimalField(max_digits=10, decimal_places=2)
    available_days = models.CharField(max_length=255)
    available_time_from = models.TimeField()
    available_time_to = models.TimeField()
    contact_number = models.CharField(max_length=15)
    social_links = models.JSONField(blank=True, null=True)
    slug = models.SlugField(unique=True, allow_unicode=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Doctors'
        ordering = ('-created_at',)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.user.get_full_name())
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Dr. {self.user.get_full_name()} - {self.specialization}"


class Patient(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    birth_date = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    address = models.TextField()
    occupation = models.CharField(max_length=100, blank=True)
    marital_status = models.CharField(max_length=50, blank=True)
    blood_type = models.CharField(max_length=3, blank=True)
    nationality = models.CharField(max_length=100, blank=True)
    languages_spoken = models.CharField(max_length=255)
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_number = models.CharField(max_length=15)
    emergency_contact_relationship = models.CharField(max_length=100, blank=True)
    insurance_provider = models.CharField(max_length=100, blank=True)
    insurance_policy_number = models.CharField(max_length=100, blank=True)
    allergies = models.TextField(blank=True)
    current_medication = models.TextField(blank=True)
    past_medical_history = models.TextField(blank=True)
    smoking_status = models.BooleanField(default=False)
    alcohol_use = models.BooleanField(default=False)
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    height = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    treatment_consent = models.BooleanField(default=False)
    privacy_consent = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.get_full_name()}"


class Feedback(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='feedback')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='feedback')
    feedback_text = models.TextField()
    doctor_response = models.TextField(blank=True, null=True)
    rating = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback by {self.patient.user.username} for Dr. {self.doctor.user.get_full_name()}"


class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(
        auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Newsletters'
        ordering = ('-created_at',)

    def __str__(self):
        return self.email



