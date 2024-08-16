# Generated by Django 5.0.7 on 2024-08-16 12:59

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
        ('workspaces', '0002_workspace_created_at_workspace_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='board',
            name='product',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='products.product'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='board',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='list',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='list',
            name='order',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='list',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='product',
            name='type',
            field=models.CharField(choices=[('software_application', 'Software Application'), ('web_application', 'Web Application'), ('api', 'API'), ('library_framework', 'Library/Framework'), ('plugin_extension', 'Plugin/Extension'), ('game', 'Game'), ('microservice', 'Microservice'), ('firmware', 'Firmware'), ('digital_content', 'Digital Content'), ('platform', 'Platform')], default='software_application', max_length=50),
        ),
        migrations.AddField(
            model_name='product',
            name='workspace',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='workspaces.workspace'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='board',
            name='visibility',
            field=models.CharField(choices=[('public', 'Public'), ('private', 'Private'), ('workspace', 'Workspace')], max_length=20),
        ),
        migrations.AlterField(
            model_name='product',
            name='status',
            field=models.CharField(choices=[('planning', 'Planning'), ('development', 'Development'), ('testing', 'Testing'), ('released', 'Released'), ('maintenance', 'Maintenance')], default='planning', max_length=50),
        ),
    ]
