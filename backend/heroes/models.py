from django.db import models

class Hero(models.Model):
  name = models.CharField(max_length=1000)
  full_name = models.CharField(max_length=1000)
  image_url = models.CharField(max_length=1000)
  slug = models.CharField(max_length=1000)
  alter_egos = models.CharField(max_length=1000, null=True)
  aliases = models.CharField(max_length=1000, null=True)
  gender = models.CharField(max_length=1000, null=True)
  publisher = models.CharField(max_length=1000, null=True)
  alignment = models.CharField(max_length=1000, null=True)
  occupation = models.CharField(max_length=1000, null=True)
  affiliations = models.CharField(max_length=1000, null=True)

  def __str__(self):
    return f'{self.name} ({self.full_name})'