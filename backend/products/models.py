from django.db import models

STATUS_CHOICES = [
    ('planning',  'Planning'),
    ('development', 'Development'),
    ('testing', 'Testing'),
    ('released', 'Relased'),
    ('maintenance', 'Maintenance')
]

VISIBILITY_CHOICES = [
    ('public', 'Public'),
    ('private', 'Private'),
    ('workspace', 'workspace')
]

class Product(models.Model):

    '''
    This model holds all necessary data about a digital/software product. It refers to the entire product/service and not its indiviudal features. 
    '''

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    # The Product Manager in charge of overseeing the product as well as the backlog is the Product Owner
    owner = models.ForeignKey('profiles.ProductManagerProfile', on_delete=models.SET_NULL)
    # Teams assigned to a product
    teams = models.ManyToManyField('accounts.Team', null=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    version = models.CharField(max_length=50)
    repository_url = models.URLField(blank=True, null=True)
    documentation_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Board(models.Model):

    title = models.CharField(max_length=255)
    visibility = models.CharField(max_length=20)

    def __str__(self):
        return self.title