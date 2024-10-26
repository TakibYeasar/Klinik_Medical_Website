from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('current-user/', CurrentUserView.as_view(),
         name='current-user'),
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-email/', VerifyUserEmail.as_view(), name='verify_email'),
    path('login/', LoginUserView.as_view(), name='login_user'),
    path('logout/', LogoutApiView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('get-something/', TestingAuthenticatedReq.as_view(), name='testing_authenticated'),
    path('password-reset/',
         PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<str:uidb64>/<str:token>/',
         PasswordResetConfirm.as_view(), name='password-reset-confirm'),
    path('set-new-password/',
         SetNewPasswordView.as_view(), name='set-new-password'),
    path('change-password/',
         ChangePasswordView.as_view(), name='change-password'),
]
