# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('register-patient/', RegisterPatientAPIView.as_view(), name='register-patient'),
    path('get-patient/<str:user_id>/', GetPatientAPIView.as_view(), name='get-patient'),
    path('appointments/', AppointmentListCreateAPIView.as_view(), name='appointment-list-create'),
    path('appointments/<int:appointment_id>/', AppointmentDetailAPIView.as_view(), name='appointment-detail'),
    path('medications/', MedicationListCreateAPIView.as_view(),
         name='medication-list-create'),
    path('medications/<int:id>/', MedicationDetailAPIView.as_view(),
         name='medication-detail'),
    path('records/', MedicalRecordListCreateAPIView.as_view(),
         name='record-list-create'),
    path('records/<int:id>/', MedicalRecordDetailAPIView.as_view(),
         name='record-detail'),
]
