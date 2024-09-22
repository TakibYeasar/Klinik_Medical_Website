from django.db import models
from django.utils.text import slugify
from django.urls import reverse


class Doctor(models.Model):
    image = models.ImageField(upload_to='doctors/', blank=True, null=True)
    name = models.CharField(max_length=255, blank=False, null=False)
    department = models.CharField(max_length=255, blank=True, null=True)
    specialization = models.CharField(max_length=255, blank=True, null=True)
    biography = models.TextField(blank=True, null=True)
    experience_years = models.PositiveIntegerField(blank=True, null=True)
    facebook_link = models.URLField(max_length=200, blank=True, null=True)
    twitter_link = models.URLField(max_length=200, blank=True, null=True)
    linkedin_link = models.URLField(max_length=200, blank=True, null=True)
    instagram_link = models.URLField(max_length=200, blank=True, null=True)
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    slug = models.SlugField(unique=True, allow_unicode=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

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
