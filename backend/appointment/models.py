from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.text import slugify
from user.models import Patient, Doctor

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled'),
        ('no_show', 'No Show'),
        ('rescheduled', 'Rescheduled'),
    ]

    APPOINTMENT_TYPE_CHOICES = [
        ('in_person', 'In-Person'),
        ('virtual', 'Virtual'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name='appointments')
    appointment_type = models.CharField(
        max_length=20, choices=APPOINTMENT_TYPE_CHOICES, default='in_person')
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='scheduled')
    payment_status = models.CharField(
        max_length=10, choices=PAYMENT_STATUS_CHOICES, default='pending')
    consultation_fee = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    reason_for_visit = models.TextField(blank=True)
    notes = models.TextField(blank=True, null=True)

    # SEO and Tracking
    slug = models.SlugField(unique=True, blank=True, editable=False)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Appointments"
        ordering = ['-date', '-time']

    def clean(self):
        """ Ensure valid date and time for appointments """
        today = timezone.now().date()
        if self.date < today:
            raise ValidationError("Appointment date cannot be in the past.")

        if self.date == today and self.time < timezone.now().time():
            raise ValidationError("Appointment time cannot be in the past.")

    def save(self, *args, **kwargs):
        """ Generate slug if not provided """
        if not self.slug:
            self.slug = slugify(f"{self.patient.user.username}-{self.date}-{self.time}")
        super().save(*args, **kwargs)

    def is_upcoming(self):
        """ Check if appointment is upcoming """
        now = timezone.now()
        appointment_datetime = timezone.datetime.combine(self.date, self.time)
        return appointment_datetime > now

    def __str__(self):
        return f"Appointment: Dr. {self.doctor.user.get_full_name()} & {self.patient.user.get_full_name()} on {self.date} at {self.time}"


