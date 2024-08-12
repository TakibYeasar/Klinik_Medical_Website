from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class CustomManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """

        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            **extra_fields,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email=email,
            username=email,
            password=password,
            **extra_fields,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    username = models.CharField(max_length=200, unique=True, blank=True)
    first_name = models.CharField(max_length=200, blank=True, null=True)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    password = models.CharField(max_length=255)
    confirm_password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    last_logind = models.DateTimeField(
        auto_now_add=True, null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomManager()

    USERNAME_FIELD = "email"

    def __str__(self):
        return self.username

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True


class OneTimePassword(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)

    def __str__(self):
        return f"{self.user.first_name} - otp code"

class UserProfile(models.Model):

    def get_user_pic_path(self):
        return f'images/{self.username}/'

    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, blank=True, null=True)
    picture = models.ImageField(
        default='images/user.jpg', upload_to='get_user_pic_path/')
    status = models.CharField(max_length=100)
    about_user = models.TextField(
        verbose_name="About User", null=True, blank=True)
    address = models.CharField(
        verbose_name="Address", max_length=512, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True)
    website = models.URLField(max_length=255, blank=True)
    city = models.CharField(max_length=32, blank=True, null=True)
    state = models.CharField(max_length=32, blank=True, null=True)
    country = models.CharField(max_length=32, blank=True, null=True)
    phone = models.CharField(max_length=32, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email
