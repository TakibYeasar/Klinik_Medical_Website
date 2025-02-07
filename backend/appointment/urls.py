from django.urls import path
from .views import *

urlpatterns = [
    path('appointments/', AppointmentListView.as_view(), name='appointment-list'),
    path('appointments-create/', AppointmentCreateView.as_view(),
         name='appointment-create'),
    path('appointments/<slug:slug>/',
         AppointmentDetailView.as_view(), name='appointment-detail'),
    path('appointments/<slug:slug>/update/',
         AppointmentUpdateView.as_view(), name='appointment-update'),
    path('appointments/<slug:slug>/delete/',
         AppointmentDeleteView.as_view(), name='appointment-delete'),

    # Doctor-specific appointment management
    path('doctors/<slug:slug>/appointments/',
         ManageAppointmentsView.as_view(), name='doctor-appointments'),
    path('doctors/<slug:slug>/appointments-create/',
         ManageAppointmentsView.as_view(), name='doctor-appointment-create'),
    path('doctors/<slug:slug>/appointments/<int:appointment_id>/update/',
         ManageAppointmentsView.as_view(), name='doctor-appointment-update'),
    path('doctors/<slug:slug>/appointments/<int:appointment_id>/cancel/',
         ManageAppointmentsView.as_view(), name='doctor-appointment-cancel'),
]
