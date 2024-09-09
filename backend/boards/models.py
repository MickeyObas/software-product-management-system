from django.db import models


VISIBILITY_CHOICES = [
    ('public', 'Public'),
    ('private', 'Private'),
    ('workspace', 'Workspace')
]

class Board(models.Model):
    admins = models.ManyToManyField('accounts.CustomUser', related_name='admin_boards')
    product = models.ForeignKey('products.Product', models.CASCADE, default=1)
    description = models.TextField()
    title = models.CharField(max_length=255)
    visibility = models.CharField(max_length=20, choices=VISIBILITY_CHOICES, default='workspace')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    

class RecentlyViewedBoard(models.Model):
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    viewed_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'board']  # Ensures a user can't have the same board listed twice.
        ordering = ['-viewed_at']  # Orders by the most recent first


class List(models.Model):
    board = models.ForeignKey('boards.Board', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
