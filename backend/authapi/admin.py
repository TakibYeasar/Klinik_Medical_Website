from django.contrib import admin
from .models import CustomUser, OneTimePassword
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class CustomUserAdmin(BaseUserAdmin):
    # Fields to be displayed in the User model list
    list_display = ["id", "email", "username", "first_name", "last_name", "role", "is_active", "is_admin"]
    list_filter = ["is_admin", "role"]
    
    # Fieldsets for detail view
    fieldsets = (
        ('User Credentials', {"fields": ["email", "password"]}),
        ("Personal Info", {"fields": ["username", "first_name", "last_name", "role"]}),
        ("Permissions", {"fields": ["is_active", "is_admin", "is_verified"]}),
        ("Additional Info", {"fields": ["last_login", "date_joined"]}),
    )
    
    # Fieldsets for adding a user
    add_fieldsets = (
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "username", "first_name", "last_name", "password", "confirm_password", "role"],
            },
        ),
    )
    
    search_fields = ["email", "username", "first_name", "last_name"]
    ordering = ["email", "id"]
    filter_horizontal = []

    def get_readonly_fields(self, request, obj=None):
        if obj:  # If the user is being edited
            return ["password", "confirm_password"]  # Make password fields readonly
        return super().get_readonly_fields(request, obj)

    def save_model(self, request, obj, form, change):
        if not change:  # If creating a new user
            obj.set_password(form.cleaned_data["password"])  # Set the password correctly
        super().save_model(request, obj, form, change)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(OneTimePassword)

