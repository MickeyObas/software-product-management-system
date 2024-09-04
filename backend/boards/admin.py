from django.contrib import admin

from .models import Board, List


class ListModelAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'board',
        'title', 
        'order'
    ]

class BoardModelAdmin(admin.ModelAdmin):
    list_display = [
        'product',
        'title',
        'description',
        'visibility'
    ]

admin.site.register(Board)
admin.site.register(List, ListModelAdmin)
