from rest_framework import serializers
from .models import *


class ContactinfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contactinfo
        fields = "__all__"


class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = "__all__"
        


class KeypointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keypoints
        fields = "__all__"


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['points'] = KeypointsSerializer(
            instance.points, context={'request': request}).data
        return response



class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url



class WhychooseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Whychoose
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url



class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"



class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url



class ContactSerialier(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'




