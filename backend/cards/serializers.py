from rest_framework import serializers
from django.contrib.auth import get_user_model
from cardCollections.models import CardCollection
from heroes.models import Hero
from .models import PlayingCard, CardPowerLevel, CardPriceBracket

User = get_user_model()

# Native Serializers
class PlayingCardSerializer(serializers.ModelSerializer):

  class Meta:
    model = PlayingCard
    fields = '__all__'

class PowerLevelSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = CardPowerLevel
    fields = '__all__'

class PriceBracketSerializer(serializers.ModelSerializer):

  class Meta:
    model = CardPriceBracket
    fields = '__all__'

# Foreign Serializers

class HeroSerializer(serializers.ModelSerializer):

  class Meta:
    model = Hero
    exclude = ('image_url', )

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'alias', )

class CollectionSerializer(serializers.ModelSerializer):

  owner = UserSerializer()
  class Meta:
    model = CardCollection
    exclude = ('cards', 'avg_level', 'price_bracket', )

# Populated Native Serializers
class PopulatedCardSerializer(PlayingCardSerializer):
  collections = CollectionSerializer(many=True)
  level = PowerLevelSerializer()
  price_bracket = PriceBracketSerializer()
  hero = HeroSerializer()
  owner = UserSerializer()
