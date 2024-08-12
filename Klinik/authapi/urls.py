from django.urls import path
from .views import *

urlpatterns = [
    path('register-user/', UserRegisterView.as_view(), name='register'),
    path('verify-email/', VerifyUserEmail.as_view(), name='verify'),
    path('login-user/', LoginUserView.as_view(), name='login'),
    path('logout/', LogOutView.as_view(), name='logout'),
    path("change-password/", ChangePasswordApiView.as_view(),
         name="change-password",),
    path('forgot-password/', ForgotPasswordView.as_view(), name='new_password'),
    path('reset-password/<str:uidb64>/<str:token>/',
         ResetPasswordView.as_view(), name='reset'),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("updateprofile/", UpdateUserProfile.as_view(), name="updateProfile")
]
