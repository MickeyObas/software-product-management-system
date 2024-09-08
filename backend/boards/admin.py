from django.contrib import admin

from .models import Board, List


class ListModelAdmin(admin.ModelAdmin):
    def list_workspace(self, obj):
        return obj.board.product.workspace
    
    list_display = [
        'id',
        'board',
        'title', 
        'order',
        'list_workspace'
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
