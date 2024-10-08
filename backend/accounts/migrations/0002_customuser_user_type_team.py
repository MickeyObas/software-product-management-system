# Generated by Django 5.0.7 on 2024-08-16 11:31

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='user_type',
            field=models.CharField(choices=[('admin', 'Admin'), ('product_manager', 'Product Manager'), ('developer', 'Developer'), ('stakeholder', 'Stakeholder/Client')], default='admin', max_length=30),
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('leader', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='team_led', to=settings.AUTH_USER_MODEL)),
                ('members', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
