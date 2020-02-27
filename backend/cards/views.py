# pylint: disable=no-member

from django.shortcuts import render
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY
from .serializers import PlayingCardSerializer, PowerLevelSerializer, PriceBracketSerializer

from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import PlayingCard, CardPowerLevel, CardPriceBracket

# Views -- Playing Cards
class SingleCard(APIView):

  def get(self, _request, pk):
    try:
      my_card = PlayingCard.objects.get(pk=pk)
      serial_card = PlayingCardSerializer(my_card)
      return Response(serial_card.data, status=HTTP_200_OK)
    except PlayingCardSerializer.DoesNotExist:
      return Response({'message: Card not found'}, status=HTTP_404_NOT_FOUND)
  
  def put(self, request, pk):
    pass

class ManyCards(APIView):

  def get(self, _request):
    my_cards = PlayingCard.objects.all()
    serial_cards = PlayingCardSerializer(my_cards, many=True)
    return Response(serial_cards.data, status=HTTP_200_OK)
  
  def post(self, request):
    pass

# Views -- Power Levels
class SinglePowerLevel(APIView):

  def get(self, _request, pk):
    my_level = CardPowerLevel.objects.get(pk=pk)
    serial_level = PowerLevelSerializer(my_level)
    return Response(serial_level.data, status=HTTP_200_OK)

class ManyPowerLevels(APIView):

  def get(self, _request):
    my_levels = CardPowerLevel.objects.all()
    serial_levels = PowerLevelSerializer(my_levels, many=True)
    return Response(serial_levels.data, status=HTTP_200_OK)

# Views -- Price Brackets
class SinglePriceBracket(APIView):

  def get(self, _request, pk):
    my_bracket = CardPriceBracket.objects.get(pk=pk)
    serial_bracket = PriceBracketSerializer(my_bracket)
    return Response(serial_bracket.data, status=HTTP_200_OK)

class ManyPriceBrackets(APIView):

  def get(self, _request):
    my_brackets = CardPriceBracket.objects.all()
    serial_brackets = PriceBracketSerializer(my_brackets, many=True)
    return Response(serial_brackets.data, status=HTTP_200_OK)
