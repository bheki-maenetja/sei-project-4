# Generated by Django 2.2.9 on 2020-02-26 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_auto_20200226_1716'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='alias',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=20),
        ),
    ]
