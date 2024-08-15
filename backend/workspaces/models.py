from django.db import models

class Workspace(models.Model):
    title = models.CharField(max_length=255)
    members = models.ManyToManyField('accounts.CustomUser')

    # TODO: Add boards
    
    def __str__(self):
        return self.title
