from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  first_name = models.CharField(max_length=20)
  last_name = models.CharField(max_length=20)
  alias = models.CharField(max_length=20, default='')
  email = models.CharField(max_length=40, unique=True)
  profile_image = models.CharField(max_length=500)
  coins = models.IntegerField(default=0)
  xp = models.IntegerField(default=0)
