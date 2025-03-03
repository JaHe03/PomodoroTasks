# Generated by Django 5.1.4 on 2024-12-23 02:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPreference',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pomodoro_duration', models.IntegerField(default=25)),
                ('long_duration', models.IntegerField(default=15)),
                ('long_duration_interval', models.IntegerField(default=4)),
                ('short_duration', models.IntegerField(default=5)),
                ('theme', models.CharField(default='light', max_length=50)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='preferences', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
