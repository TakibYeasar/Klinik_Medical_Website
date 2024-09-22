from django.db import models
from django.shortcuts import reverse
from django.utils.text import slugify

# Create your models here.

class Contactinfo(models.Model):
    address = models.CharField(max_length=255, blank=True, null=True)
    time = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=16, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    facebook_link = models.CharField(max_length=100, blank=True, null=True)
    twitter_link = models.CharField(max_length=100, blank=True, null=True)
    linkedin_link = models.CharField(max_length=100, blank=True, null=True)
    instagram_link = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Contact Info'

    def __str__(self):
        return self.email


class Banner(models.Model):
    image = models.ImageField(upload_to='banner/')
    title = models.CharField(max_length=255, blank=True, null=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Banners'
        ordering = ('-created',)

    def __str__(self):
        return self.title


class Service(models.Model):
    icon = models.ImageField(upload_to='service/', blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Service'
        ordering = ('-created',)

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    image = models.ImageField(upload_to='testimonial/', blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    profession = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    slug = models.SlugField(null=False, allow_unicode=True, db_index=True, blank=True, unique=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Testimonial'
        ordering = ('-created',)
        
    def save(self, *args, **kwargs):
        # Use a custom slugify function if desired
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('core:testimonial', args=[self.slug])


class Contact(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=50, blank=True, null=True)
    subject = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = 'Contact'

    def __str__(self):
        return self.email

    def get_absolute_url(self):
        return reverse('core:contact', args=[self.slug])


class Newslatter(models.Model):
    email = models.EmailField(max_length=255, blank=True, null=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Newslatter'
        ordering = ('-created',)

    def __str__(self):
        return self.email


class Notification(models.Model):
    message = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification: {self.message[:20]} - {self.date_sent}"


