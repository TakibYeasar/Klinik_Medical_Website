# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('doctors/', DoctorListCreateAPIView.as_view(), name='doctor-list-create'),
    path('doctors/<int:id>/', DoctorDetailAPIView.as_view(), name='doctor-detail'),
]
