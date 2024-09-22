from django.core.exceptions import PermissionDenied
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.conf import settings
import random
from .models import CustomUser, OneTimePassword

def send_email(request, mail_subject, email_template, user):
    """Send email"""
    from_email = settings.EMAIL_HOST_USER
    current_site = get_current_site(request)
    message = render_to_string(email_template, {
        'user': user,
        'domain': current_site,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': default_token_generator.make_token(user),
    })
    to_email = user.email
    mail = EmailMessage(mail_subject, message, from_email, to=[to_email])
    mail.content_subtype = 'html'
    mail.send()
    print(f'Subject: {mail_subject}\nFrom: {
          from_email}\nTo: {to_email}\n{message}')


def send_generated_otp_to_email(request, email):
    """Send OTP for email verification"""
    from_email = settings.EMAIL_HOST_USER
    current_site = get_current_site(request)
    user = CustomUser.objects.get(email=email)

    # Generate OTP and save to the database
    otp = random.randint(1000, 9999)
    OneTimePassword.objects.create(user=user, otp=otp)

    # Render email body using a template
    email_body = render_to_string('email/otp_verification.html', {
        'user': user,
        'domain': current_site.domain,
        'otp': otp,
    })

    # Prepare and send the email
    mail_subject = "One-Time Passcode for Email Verification"
    mail = EmailMessage(mail_subject, email_body, from_email, to=[user.email])
    mail.content_subtype = 'html'
    mail.send()

    print(f'Subject: {mail_subject}\nFrom: {
          from_email}\nTo: {user.email}\n{email_body}')


def send_notification_email(mail_subject, mail_template, context):
    """Send notification email"""
    from_email = settings.EMAIL_HOST_USER
    message = render_to_string(mail_template, context)
    if isinstance(context['to_email'], str):
        to_email = [context['to_email']]
    else:
        to_email = context['to_email']
    mail = EmailMessage(mail_subject, message, from_email, to=to_email)
    mail.content_subtype = 'html'
    mail.send()
    print(f'Subject: {mail_subject}\nFrom: {
          from_email}\nTo: {to_email}\n{message}')
