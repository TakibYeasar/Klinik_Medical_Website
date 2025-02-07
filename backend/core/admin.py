from django.contrib import admin
from .models import Contactinfo, Banner, Service, Contact

@admin.register(Contactinfo)
class ContactinfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'phone', 'address')
    search_fields = ('email', 'phone', 'address')

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created')
    search_fields = ('title',)
    list_filter = ('created',)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created')
    search_fields = ('title', 'description')
    list_filter = ('created',)

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'subject')
    search_fields = ('name', 'email', 'subject')
    list_filter = ('email',)
