from django.contrib import admin

from .models import Workspace

class WorkspaceModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']

admin.site.register(Workspace, WorkspaceModelAdmin)