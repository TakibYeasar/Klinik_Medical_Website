from django.contrib import admin
from .models import CustomUser, OneTimePassword
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class CustomUserAdmin(BaseUserAdmin):
    # Fields to be displayed in the User model list
    list_display = ["id", "email", "username", "first_name",
                    "last_name", "role", "is_active", "is_admin"]
    list_filter = ["is_admin", "role"]

    # Fieldsets for detail view
    fieldsets = (
        ('User Credentials', {"fields": ["email", "password"]}),
        ("Personal Info", {"fields": [
         "username", "first_name", "last_name", "role"]}),
        ("Permissions", {"fields": ["is_active", "is_admin", "is_verified"]}),
        # Read-only field
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

    # Mark 'last_login' as read-only
    readonly_fields = ["last_login", "date_joined"]

    def get_readonly_fields(self, request, obj=None):
        if obj:  # If the user is being edited
            # Make password fields readonly
            return ["password", "confirm_password"] + self.readonly_fields
        return self.readonly_fields

    def save_model(self, request, obj, form, change):
        if not change:  # If creating a new user
            # Set the password correctly
            obj.set_password(form.cleaned_data["password"])
        super().save_model(request, obj, form, change)


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(OneTimePassword)
