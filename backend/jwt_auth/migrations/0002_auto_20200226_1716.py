# Generated by Django 2.2.9 on 2020-02-26 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='coins',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='xp',
            field=models.IntegerField(default=0),
        ),
    ]
