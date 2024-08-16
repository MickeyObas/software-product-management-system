from django.contrib import admin

from .models import (
    AdminProfile,
    BaseProfile,
    ClientProfile,
    DeveloperProfile,
    ProductManagerProfile
)

admin.site.register(AdminProfile)
admin.site.register(ClientProfile)
admin.site.register(DeveloperProfile)
admin.site.register(ProductManagerProfile)
