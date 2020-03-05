# pylint: disable=no-member

from django.db import models
from django.contrib.auth import get_user_model
from heroes.models import Hero

User = get_user_model()

class CardPowerLevel(models.Model):
  name = models.CharField(max_length=40, unique=True)
  power_level = models.IntegerField(unique=True)

  def __str__(self):
    return f'{self.name} (Level {self.power_level})'

class CardPriceBracket(models.Model):
  name = models.CharField(max_length=50, unique=True)
  value = models.IntegerField(unique=True)

  def __str__(self):
    return f'{self.name} (Value - {self.value})'

class PlayingCard(models.Model):
  name = models.CharField(max_length=1000)
  image = models.CharField(max_length=1000)
  owner = models.ForeignKey(User, related_name='cards', null=True, on_delete=models.DO_NOTHING)
  hero = models.ForeignKey(Hero, related_name='cards', null=True, on_delete=models.CASCADE)
  intelligence = models.IntegerField(default=0)
  strength = models.IntegerField(default=0)
  durability = models.IntegerField(default=0)
  speed = models.IntegerField(default=0)
  power = models.IntegerField(default=0)
  combat = models.IntegerField(default=0)
  overall = models.IntegerField(default=0)
  level = models.ForeignKey(CardPowerLevel, related_name='cards', null=True, on_delete=models.DO_NOTHING)
  price = models.IntegerField(default=0)
  price_bracket = models.ForeignKey(CardPriceBracket, related_name='cards', null=True, on_delete=models.DO_NOTHING)

  def __str__(self):
    return f'{self.name} (Id: {self.id})'