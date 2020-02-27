from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CardCollection, CollectionPowerLevel, CollectionPriceBracket
from cards.models import PlayingCard, CardPowerLevel, CardPriceBracket
from heroes.models import Hero

User = get_user_model()

# Native Serializers
class CardCollectionSerializer(serializers.ModelSerializer):

  class Meta:
    model = CardCollection
    fields = '__all__'

class PowerLevelSerializer(serializers.ModelSerializer):

  class Meta:
    model = CollectionPowerLevel
    fields = ('id', 'name', 'power_level', )

class PriceBracketSerializer(serializers.ModelSerializer):

  class Meta:
    model = CollectionPriceBracket
    fields = ('id', 'name', 'value', )

# Foreign Serializers
class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'alias', )

class CardPowerLevelSerializer(serializers.ModelSerializer):
  class Meta:
    model = CardPowerLevel
    fields = '__all__'

class CardPriceBracketSerializer(serializers.ModelSerializer):
  class Meta:
    model = CardPriceBracket
    fields = '__all__'

class HeroSerializer(serializers.ModelSerializer):
  class Meta:
    model = Hero
    exclude = ('image_url', )

class PlayingCardSerializer(serializers.ModelSerializer):

  level = CardPowerLevelSerializer()
  price_bracket = CardPriceBracketSerializer()
  hero = HeroSerializer()
  owner = UserSerializer()

  class Meta:
    model = PlayingCard
    fields = '__all__'

# Populated Native Serializers
class PopulatedCollectionSerializer(CardCollectionSerializer):
  avg_level = PowerLevelSerializer()
  price_bracket = PriceBracketSerializer()
  owner = UserSerializer()
  cards = PlayingCardSerializer(many=True)
