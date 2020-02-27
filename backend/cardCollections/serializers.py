from rest_framework import serializers
from .models import CardCollection, CollectionPowerLevel, CollectionPriceBracket

class CardCollectionSerializer(serializers.ModelSerializer):

  class Meta:
    model = CardCollection
    fields = '__all__'

class PowerLevelSerializer(serializers.ModelSerializer):

  class Meta:
    model = CollectionPowerLevel
    fields = ('id', 'name', 'power_level', 'collections')

class PriceBracketSerializer(serializers.ModelSerializer):

  class Meta:
    model = CollectionPriceBracket
    fields = ('id', 'name', 'value', 'collections')