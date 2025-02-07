from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include('authapi.urls')),
    path("api/user/", include('user.urls')),
    path("api/core/", include('core.urls')),
    path("api/appointment/", include('appointment.urls')),
    # path("api/medicalrecords/", include('medicalrecords.urls')),
    # path("api/billing/", include('billing.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)