from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import CustomUserManager


USER_TYPE_CHOICES = [
    ('admin', 'Admin'),
    ('product_manager', 'Product Manager'),
    ('developer', 'Developer'),
    ('stakeholder', 'Stakeholder/Client'),
]

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    user_type = models.CharField(max_length=30, choices=USER_TYPE_CHOICES, default='admin')

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    

class Team(models.Model):
    title = models.CharField(max_length=255)
    leader = models.OneToOneField('accounts.CustomUser', on_delete=models.CASCADE, related_name='team_led')
    members = models.ManyToManyField('accounts.CustomUser')

    def __str__(self):
        return self.title

    


