from django.db import models

from accounts.models import CustomUser


class BaseProfile(models.Model):

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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