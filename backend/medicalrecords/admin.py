from django.contrib import admin
from .models import Referral, VisitNote, LabTest, MedicalRecord

@admin.register(Referral)
class ReferralAdmin(admin.ModelAdmin):
    list_display = ('patient', 'specialist', 'status', 'referral_date')
    list_filter = ('status', 'referral_date')
    search_fields = ('patient__user__username', 'specialist__user__username', 'reason')
    readonly_fields = ('referral_date',)
    fieldsets = (
        ('Referral Details', {
            'fields': ('patient', 'specialist', 'reason', 'status', 'referral_document')
        }),
        ('Timestamps', {
            'fields': ('referral_date',)
        }),
    )

@admin.register(VisitNote)
class VisitNoteAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'visit_date')
    list_filter = ('visit_date',)
    search_fields = ('patient__user__username', 'doctor__user__username', 'notes')
    readonly_fields = ('visit_date',)
    fieldsets = (
        ('Visit Note Details', {
            'fields': ('patient', 'doctor', 'notes', 'additional_files')
        }),
        ('Timestamps', {
            'fields': ('visit_date',)
        }),
    )

@admin.register(LabTest)
class LabTestAdmin(admin.ModelAdmin):
    list_display = ('patient', 'test_name', 'status', 'date_ordered', 'result_date')
    list_filter = ('status', 'date_ordered', 'result_date')
    search_fields = ('patient__user__username', 'test_name', 'results')
    readonly_fields = ('date_ordered',)
    fieldsets = (
        ('Lab Test Details', {
            'fields': ('patient', 'test_name', 'instructions', 'status', 'results', 'result_date', 'lab_report')
        }),
        ('Timestamps', {
            'fields': ('date_ordered',)
        }),
    )

@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'next_followup_date', 'created_at')
    list_filter = ('created_at', 'next_followup_date')
    search_fields = ('patient__user__username', 'doctor__user__username')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Medical Record Details', {
            'fields': ('patient', 'doctor', 'prescription', 'referral', 'lab_test', 'visit_note', 'medical_documents')
        }),
        ('Follow-Up', {
            'fields': ('next_followup_date',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
