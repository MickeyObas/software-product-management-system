from django.db import models

from accounts.models import CustomUser


class BaseProfile(models.Model):

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, default=1)
    full_name = models.CharField(max_length=255, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.user.email
    

class AdminProfile(BaseProfile):
    pass

class ProductManagerProfile(BaseProfile):
    pass

class DeveloperProfile(BaseProfile):
    pass

class ClientProfile(BaseProfile):
    pass