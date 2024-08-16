from django.contrib import admin

from .models import (
    Board,
    List,
    Product
)

admin.site.register(Board)
admin.site.register(List)
admin.site.register(Product)