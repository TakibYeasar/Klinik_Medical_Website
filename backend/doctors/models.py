from django.db import models
from django.utils.text import slugify
from django.urls import reverse


class Doctor(models.Model):
    # Basic Info
    image = models.ImageField(upload_to='doctors/', blank=True, null=True)
    name = models.CharField(max_length=255, blank=False, null=False)
    department = models.CharField(max_length=255, blank=True, null=True)
    specialization = models.CharField(max_length=255, blank=True, null=True)
    biography = models.TextField(blank=True, null=True)
    experience_years = models.PositiveIntegerField(blank=True, null=True)

    # Additional Fields
    qualifications = models.CharField(
        max_length=500, blank=True, null=True)
    achievements = models.TextField(blank=True, null=True)
    languages_spoken = models.CharField(max_length=255, blank=True, null=True)
    consultation_fees = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    available_days = models.CharField(max_length=255, blank=True, null=True)
    available_time_from = models.TimeField(blank=True, null=True)
    available_time_to = models.TimeField(blank=True, null=True)

    # Contact and Social Media
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    twitter_link = models.URLField(max_length=200, blank=True, null=True)
    linkedin_link = models.URLField(max_length=200, blank=True, null=True)
    instagram_link = models.URLField(max_length=200, blank=True, null=True)
    website_link = models.URLField(max_length=200, blank=True, null=True)

    # SEO and Metadata
    slug = models.SlugField(unique=True, allow_unicode=True, blank=True)
    meta_title = models.CharField(
        max_length=255, blank=True, null=True)
    meta_description = models.TextField(
        blank=True, null=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Doctors'
        ordering = ('-created_at',)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('core:doctor_detail', args=[self.slug])
