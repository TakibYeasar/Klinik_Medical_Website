from django.urls import path
from .views import *

urlpatterns = [
    # Doctor Profile
    path('doctors/<slug:slug>/', DoctorProfileView.as_view(), name='doctor-profile'),

    # Admin Management of Doctors
    path('admin-doctors/', AdminManageDoctorsView.as_view(),
         name='admin-manage-doctors'),
    path('admin-doctors/<int:user_id>/',
         AdminManageDoctorsView.as_view(), name='admin-approve-doctor'),
    path('admin-approved-doctors/', AdminApprovedDoctorsView.as_view(),
         name='admin-approved-doctors'),

    # Patient Management
    path('patients/<int:patient_id>/<str:action_type>/',
         PatientManagementView.as_view(), name='patient-records'),
    path('patients/<int:patient_id>/<str:action_type>/<int:record_id>/',
         PatientManagementView.as_view(), name='update-patient-record'),

    # Patient Feedback
    path('patients-feedback/', PatientFeedbackView.as_view(),
         name='patient-feedback'),

    # Doctor Feedback
    path('doctors-feedback/', DoctorFeedbackView.as_view(), name='doctor-feedback'),

    # Newsletter Management
    path('newsletter-subscribe/', NewsletterSubscriptionView.as_view(),
         name='newsletter-subscribe'),
    path('newsletter-unsubscribe/', NewsletterUnsubscriptionView.as_view(),
         name='newsletter-unsubscribe'),
    path('newsletter-send/', SendNewsletterView.as_view(), name='send-newsletter'),
]
