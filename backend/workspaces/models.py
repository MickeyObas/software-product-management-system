from django.db import models

class Workspace(models.Model):
    # TODO Make creator/owner of workspace automatically a member of the workspace
    owner = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE, default=1, related_name='workspaces_owned')
    title = models.CharField(max_length=255)
    description = models.TextField()
    members = models.ManyToManyField('accounts.CustomUser', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
