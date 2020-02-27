from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class CollectionPowerLevel(models.Model):
  name = models.CharField(max_length=50, unique=True)
  power_level = models.IntegerField(unique=True)

  def __str__(self):
    return f'{self.name} (Level {self.power_level})'

class CollectionPriceBracket(models.Model):
  name = models.CharField(max_length=50, unique=True)
  value = models.IntegerField(unique=True)

  def __str__(self):
    return f'{self.name} (Value - {self.value})'

class CardCollection(models.Model):
  name = models.CharField(max_length=1000)
  image = models.CharField(max_length=1000)
  value = models.IntegerField(default=0)
  avg_overall = models.IntegerField(default=0)
  owner = models.ForeignKey(User, related_name='collections', null=False, on_delete=models.CASCADE)
  avg_level = models.ForeignKey(CollectionPowerLevel, related_name='collections', null=True, on_delete=models.DO_NOTHING)
  price_bracket = models.ForeignKey(CollectionPriceBracket, related_name='collections', null=True, on_delete=models.DO_NOTHING)
  cards = models.ManyToManyField('cards.PlayingCard', related_name='collections', blank=True)

  def __str__(self):
    return f'{self.name} ({self.owner})'