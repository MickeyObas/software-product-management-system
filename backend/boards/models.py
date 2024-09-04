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
    

class List(models.Model):
    board = models.ForeignKey('boards.Board', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
