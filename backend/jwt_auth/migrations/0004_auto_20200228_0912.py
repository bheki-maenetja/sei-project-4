# Generated by Django 2.2.9 on 2020-02-28 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0003_auto_20200226_1931'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='coins',
            field=models.IntegerField(default=500),
        ),
    ]
