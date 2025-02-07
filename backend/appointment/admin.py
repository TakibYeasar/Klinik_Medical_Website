from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        'patient', 'doctor', 'date', 'time',
        'status', 'payment_status', 'consultation_fee'
    )
    list_filter = ('status', 'payment_status', 'appointment_type', 'date')
    search_fields = ('patient__user__username', 'doctor__user__username', 'reason_for_visit')
    ordering = ('-date', '-time')
    readonly_fields = ('created_at', 'updated_at', 'slug')

    fieldsets = (
        ('Appointment Details', {
            'fields': ('patient', 'doctor', 'appointment_type', 'date', 'time', 'status')
        }),
        ('Payment Information', {
            'fields': ('payment_status', 'consultation_fee')
        }),
        ('Additional Information', {
            'fields': ('reason_for_visit', 'notes', 'slug')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
