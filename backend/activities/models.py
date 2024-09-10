from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.conf import settings
import json

class Activity(models.Model):
    # TODO:  Display activities relating a user to a workspace, card, or board
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=50)  # e.g., 'created', 'updated'
    activity_type = models.CharField(max_length=100, default='', blank=True, null=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')
    workspace = models.ForeignKey('workspaces.Workspace', on_delete=models.CASCADE, null=True)

    object_data = models.JSONField()  # To store all object data
    extra_data = models.JSONField(blank=True, null=True)

    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user} {self.action_type}  at {self.timestamp}"

        # {self.object_data.get('title', 'object')}
