from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=255)
    d_o_b = models.DateField(null=True)
    dept = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    

class Item(models.Model):
    owner = models.ForeignKey('accounts.CustomUser', default=1, on_delete=models.CASCADE, related_name='items')
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.title} by {self.owner.email}"

    