#pylint: disable = no-member, arguments-differ
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

from cards.models import PlayingCard, CardPowerLevel, CardPriceBracket
from heroes.models import Hero
from cardCollections.models import CardCollection, CollectionPowerLevel, CollectionPriceBracket
# import django.contrib.auth.password_validation as validations
# from django.core.exceptions import ValidationError
User = get_user_model()

# Native Serializers
class UserSerializer(serializers.ModelSerializer):

  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)

  def validate(self, data):
    password = data.pop('password')
    password_confirmation = data.pop('password_confirmation')

    if password != password_confirmation:
      raise serializers.ValidationError({'password_confirmation': 'Does Not Match'})

    # Additional password validation
    # try:
    #   validations.validate_password(password=password)
    # except ValidationError as err:
    #   raise serializers.ValidationError({'password_confirmation': err.messages})

    data['password'] = make_password(password)
    return data
  
  class Meta:
    model = User
    fields = '__all__'

# Foreign Serializers
class CardPowerLevelSerializer(serializers.ModelSerializer):
  class Meta:
    model = CardPowerLevel
    fields = '__all__'

class CardPriceBracketSerializer(serializers.ModelSerializer):
  class Meta:
    model = CardPriceBracket
    fields = '__all__'

class CollectionPowerLevelSerializer(serializers.ModelSerializer):
  class Meta:
    model = CollectionPowerLevel
    fields = '__all__'

class CollectionPriceBracketSerializer(serializers.ModelSerializer):
  class Meta:
    model = CollectionPriceBracket
    fields = '__all__'

class CardSerializer(serializers.ModelSerializer):
  level = CardPowerLevelSerializer()
  price_bracket = CardPriceBracketSerializer()
  class Meta:
    model = PlayingCard
    fields = ('id', 'name', 'image', 'overall', 'level', 'price_bracket')

class CollectionSerializer(serializers.ModelSerializer):
  avg_level = CollectionPowerLevelSerializer()
  price_bracket = CollectionPriceBracketSerializer()
  class Meta:
    model = CardCollection
    exclude = ('owner', 'cards')

# Populated Native Serializers
class PopulatedUserSerializer(UserSerializer):
  cards = CardSerializer(many=True)
  collections = CollectionSerializer(many=True)
  