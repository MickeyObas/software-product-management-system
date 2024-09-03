from django.db import models

class Label(models.Model):
    title = models.CharField(max_length=100)
    color = models.CharField(max_length=7)

class Checklist(models.Model):
    card = models.ForeignKey('cards.Card', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)

class ChecklistItem(models.Model):
    checklist = models.ForeignKey('cards.Checklist', on_delete=models.CASCADE)
    members = models.ManyToManyField('accounts.CustomUser')
    due_date = models.DateField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)

class Card(models.Model):
    list = models.ForeignKey('boards.List', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    is_watched = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)
    members = models.ManyToManyField('accounts.CustomUser', blank=True)
    order = models.PositiveIntegerField(default=0)
    labels = models.ManyToManyField('cards.Label', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class CardDateItem(models.Model):
    card = models.ForeignKey('cards.Card', on_delete=models.CASCADE)
    start_date = models.DateField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)

class CardAttachmentItem(models.Model):
    card = models.ForeignKey('cards.Card', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='uploads/')
    file_type = models.CharField(max_length=50, choices=[('image', 'Image'), ('document', 'Document')])
    created_at = models.DateTimeField(auto_now_add=True)
    

class CardCoverItem(models.Model):
    color = models.CharField(max_length=50, null=True)
    image = models.ImageField(upload_to='uploads/')

class CardCommentItem(models.Model):
    card = models.ForeignKey('cards.Card', on_delete=models.CASCADE)
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)