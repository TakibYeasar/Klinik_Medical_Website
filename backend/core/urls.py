from django.urls import path
from .views import *

urlpatterns = [
    path('contactinfo/', ContactinfoView.as_view(), name='contactinfo-list'),
    path('banner/', BannerView.as_view(), name='banner-list'),
    path('service/', ServiceView.as_view(), name='service-list'),
    path('testimonials/', TestimonialListCreateAPIView.as_view(),
         name='testimonial-list-create'),
    path('testimonials/<slug:slug>/',
         TestimonialDetailAPIView.as_view(), name='testimonial-detail'),
    path('contact/', ContactView.as_view(), name='contact-create'),
    path('notifications/', NotificationListCreateAPIView.as_view(),
         name='notification-list-create'),
    path('notifications/<int:id>/', NotificationDetailAPIView.as_view(),
         name='notification-detail'),
]
