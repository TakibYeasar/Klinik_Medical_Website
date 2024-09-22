from django.contrib import admin

from .models import (
    Patient,
    Appointment,
    Medication,
    MedicalRecord,
)

admin.site.register([
    Patient,
    Appointment,
    Medication,
    MedicalRecord,
])
