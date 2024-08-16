from django.db import models

class Workspace(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    members = models.ManyToManyField('accounts.CustomUser')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
