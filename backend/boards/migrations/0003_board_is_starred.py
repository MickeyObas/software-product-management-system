# Generated by Django 5.0.7 on 2024-09-09 07:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0002_recentlyviewedboard'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='is_starred',
            field=models.BooleanField(default=False),
        ),
    ]
