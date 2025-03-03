# Generated by Django 5.1.4 on 2024-12-23 04:52

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_userpreference_delete_preferences'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='userpreference',
            name='theme',
            field=models.CharField(default='default', max_length=50),
        ),
        migrations.AlterField(
            model_name='userpreference',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
