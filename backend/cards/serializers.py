from rest_framework import serializers
from .models import PlayingCard, CardPowerLevel, CardPriceBracket

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