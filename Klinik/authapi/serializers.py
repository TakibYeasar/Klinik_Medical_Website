from rest_framework import serializers, exceptions
from .models import *
from django.contrib.auth import authenticate
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class UserRegesterationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "password",
            "confirm_password"
        ]

    def validate(self, attrs):
        if not attrs.get("username").isalnum():
            raise serializers.ValidationError(
                'username must contains letters as well')

        if attrs.get("password") != attrs.get("confirm_password"):
            raise serializers.ValidationError(
                {"detail": "Passwords not matched!"})

        try:
            validate_password(attrs.get("password"))
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'token']

    def get_token(self, obj):
        user = CustomUser.objects.get(email=obj['email'])

        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access'],
        }

    def validate(self, attrs):
        user = authenticate(username=attrs.get('username'), email=attrs.get(
            'email'), password=attrs.get('password'))

        if not user:
            raise exceptions.AuthenticationFailed('there is no such user')

        if not user.is_active:
            raise exceptions.AuthenticationFailed('Your account is blocked')

        if not user.is_verified:
            raise exceptions.AuthenticationFailed(
                'Your account is not verfied yet')

        attrs["user"] = user
        return attrs


class LogoutSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=500)

    class Meta:
        fields = ['token', ]


class ChangePasswordSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(max_length=100)

    class Meta:
        model = CustomUser
        fields = ['current_password', 'password', 'confirm_password']

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("confirm_password"):
            raise serializers.ValidationError(
                {"detail": "Passwords not matched!"})

        try:
            validate_password(attrs.get("password"))
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

        return super().validate(attrs)


class ForgotPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        models: CustomUser
        fields = ['email', ]


class ResetPasswordSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=100)
    uidb64 = serializers.CharField(max_length=255)

    class Meta:
        models: CustomUser
        fields = ["token",
                  "password",
                  "uidb64",
                  ]

    def validate(self, attrs):
        token = attrs.get('token')
        password = attrs.get('password')
        uidb64 = attrs.get('uidb64')

        id = smart_str(urlsafe_base64_decode(uidb64))
        user_qs = CustomUser.objects.filter(id=id)
        if user_qs.exists():
            user = user_qs[0]
            token = PasswordResetTokenGenerator().check_token(user, token)
            if not token:
                raise exceptions.ValidationError('token is in valid')

            user.set_password(password)
            user.save()
            return super().validate(attrs)

        else:
            raise exceptions.ValidationError('user is not exists')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
        read_only_fields = ['user']

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = ProfileSerializer(instance.user).data
        return response
