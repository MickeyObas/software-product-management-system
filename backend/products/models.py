from django.db import models

STATUS_CHOICES = [
    ('planning',  'Planning'),
    ('development', 'Development'),
    ('testing', 'Testing'),
    ('released', 'Released'),
    ('maintenance', 'Maintenance')
]

VISIBILITY_CHOICES = [
    ('public', 'Public'),
    ('private', 'Private'),
    ('workspace', 'Workspace')
]

PRODUCT_TYPE_CHOICES = [
    ('software_application', 'Software Application'),
    ('web_application', 'Web Application'),
    ('api', 'API'),
    ('library_framework', 'Library/Framework'),
    ('plugin_extension', 'Plugin/Extension'),
    ('game', 'Game'),
    ('microservice', 'Microservice'),
    ('firmware', 'Firmware'),
    ('digital_content', 'Digital Content'),
    ('platform', 'Platform'),
]

class Product(models.Model):

    '''
    This model holds all necessary data about a digital/software product. It refers to the entire product/service and not its indiviudal features. 
    '''
    workspace = models.ForeignKey('workspaces.Workspace', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=PRODUCT_TYPE_CHOICES, default='software_application')
    description = models.TextField(blank=True, null=True)
    # The Product Manager in charge of overseeing the product as well as its backlog is the Product Owner
    owner = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE, default=1)
    # Teams assigned to a product
    # TODO: Consider a better way to handle reverse relationship lmao
    teams = models.ManyToManyField('accounts.Team', blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='planning')
    version = models.CharField(max_length=50, blank=True, null=True)
    repository_url = models.URLField(blank=True, null=True)
    documentation_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    