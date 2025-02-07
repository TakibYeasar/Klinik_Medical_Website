from django.urls import path
from .views import *

urlpatterns = [
    path('contact-info/', GetContactInfoView.as_view(), name='get_contactinfo'),
    path('create-contact-info/', CreateContactInfoView.as_view(),
         name='create_contactinfo'),
    path('update-contact-info/<int:pk>/',
         UpdateContactInfoView.as_view(), name='update_contactinfo'),
    path('delete-contact-info/<int:pk>/',
         DeleteContactInfoView.as_view(), name='delete_contactinfo'),
    
    path('banners/', BannerView.as_view(), name='banner-list'),
    path('banners-create/', CreateBannerView.as_view(), name='banner-create'),
    path('banners-update/<int:pk>/',
         UpdateBannerView.as_view(), name='banner-update'),
    path('banners-delete/<int:pk>/',
         DeleteBannerView.as_view(), name='banner-delete'),

    path('services/', ServiceView.as_view(), name='service-list'),
    path('services-create/', CreateServiceView.as_view(), name='service-create'),
    path('services-update/<int:pk>/',
         UpdateServiceView.as_view(), name='service-update'),
    path('services-delete/<int:pk>/',
         DeleteServiceView.as_view(), name='service-delete'),
    
    path('contact/', ContactView.as_view(), name='contact-create'),
]
