from django.contrib import admin

from .models import (
    Contactinfo,
    Banner,
    Service,
    Testimonial,
    Contact,
    Newslatter,
    Notification,
)

admin.site.register([
    Contactinfo,
    Banner,
    Service,
    Testimonial,
    Contact,
    Newslatter,
    Notification,
])
