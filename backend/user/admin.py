from django.contrib import admin
from .models import *

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialization', 'department', 'experience_years')
    search_fields = ('user__username', 'specialization', 'department')
    list_filter = ('department', 'experience_years')

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('user', 'birth_date', 'gender', 'blood_type')
    search_fields = ('user__username', 'blood_type', 'nationality')
    list_filter = ('gender',)
    
@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'rating', 'created_at')
    search_fields = ('patient__user__username', 'doctor__user__username', 'rating')
    list_filter = ('rating', 'created_at')


@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at')
    search_fields = ('email',)
    list_filter = ('created_at',)
    ordering = ('-created_at',)
