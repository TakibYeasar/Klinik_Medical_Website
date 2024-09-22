from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail

# Create your views here.

class ContactinfoView(APIView):
    def get(self, request):
        try:
            info_obj = Contactinfo.objects.all()
            info_serializer = ContactinfoSerializer(
                info_obj, many=True, context={'request': request}).data
            return Response(info_serializer, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response({'error': 'No contact info found'}, status=status.HTTP_404_NOT_FOUND)


class BannerView(APIView):
    def get(self, request):
        try:
            banner_obj = Banner.objects.all()
            banner_serializer = BannerSerializer(
                banner_obj, many=True, context={'request': request}).data
            return Response(banner_serializer, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'No banner found'}, status=status.HTTP_404_NOT_FOUND)


class ServiceView(APIView):
    def get(self, request):
        try:
            service_obj = Service.objects.all()
            service_serializer = ServiceSerializer(
                service_obj, many=True, context={'request': request}).data
            return Response(service_serializer, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response({'error': 'No service found'}, status=status.HTTP_404_NOT_FOUND)


class TestimonialListCreateAPIView(APIView):
    def get(self, request):
        testimonials = Testimonial.objects.all()
        serializer = TestimonialSerializer(testimonials, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TestimonialSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TestimonialDetailAPIView(APIView):
    def get_object(self, slug):
        try:
            return Testimonial.objects.get(slug=slug)
        except Testimonial.DoesNotExist:
            return None

    def get(self, request, slug):
        testimonial = self.get_object(slug)
        if testimonial is None:
            return Response({"detail": "Testimonial not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = TestimonialSerializer(testimonial)
        return Response(serializer.data)

    def put(self, request, slug):
        testimonial = self.get_object(slug)
        if testimonial is None:
            return Response({"detail": "Testimonial not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = TestimonialSerializer(testimonial, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug):
        testimonial = self.get_object(slug)
        if testimonial is None:
            return Response({"detail": "Testimonial not found."}, status=status.HTTP_404_NOT_FOUND)
        testimonial.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ContactView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request, format=None):
        data = self.request.data
        response = 'You will be contacted shortly.'

        try:
            send_mail(data['subject'],
                      'Name: ' + data['name'] + '\nEmail: ' + data['email'] +
                      '\n\nMessage:\n' + data['message'] + '\n\n' + response,
                      '19bcp101.nepal@gmail.com',
                      [data['email'], 'nothing3669@gmail.com'],
                      fail_silently=False)

            contact = Contact(name=data['name'],
                              email=data['email'],
                              subject=data['subject'],
                              message=data['message'])
            contact.save()

            return Response({'success': 'Message sent successfully'})

        except:
            return Response({'error': 'Message failed to send'})


class NotificationListCreateAPIView(APIView):
    def get(self, request):
        notifications = Notification.objects.all()
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NotificationDetailAPIView(APIView):
    def get_object(self, id):
        try:
            return Notification.objects.get(id=id)
        except Notification.DoesNotExist:
            return None

    def get(self, request, id):
        notification = self.get_object(id)
        if notification is None:
            return Response({"detail": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)

    def delete(self, request, id):
        notification = self.get_object(id)
        if notification is None:
            return Response({"detail": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)
        notification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


