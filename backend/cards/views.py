# pylint: disable=no-member
import json
import requests
from django.shortcuts import render
from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_406_NOT_ACCEPTABLE, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from .serializers import PlayingCardSerializer, PowerLevelSerializer, PriceBracketSerializer, PopulatedCardSerializer, UserSerializer

from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import PlayingCard, CardPowerLevel, CardPriceBracket
from heroes.models import Hero

User = get_user_model()

# Views -- Playing Cards
class SingleCard(APIView):

  def get(self, _request, pk):
    try:
      my_card = PlayingCard.objects.get(pk=pk)
      serial_card = PopulatedCardSerializer(my_card)
      return Response(serial_card.data, status=HTTP_200_OK)
    except PlayingCardSerializer.DoesNotExist:
      return Response({'message: Card not found'}, status=HTTP_404_NOT_FOUND)

## Level-Up
class LevelUpCard(APIView):
  
  def update_stats(self, card_dict):
    base_prices = {1: 100, 2: 200, 3: 400, 4: 800, 5: 1600}

    intelligence = card_dict['intelligence']
    strength = card_dict['strength']
    durability = card_dict['durability']
    speed = card_dict['speed']
    combat = card_dict['combat']
    power = card_dict['power']

    overall = int((intelligence + strength + durability + speed + combat + power) / 6)

    if overall >= 90: power_level = 5
    elif 90 > overall >= 70: power_level = 4
    elif 70 > overall >= 50: power_level = 3
    elif 50 > overall >= 30: power_level = 2
    else: power_level = 1

    price = base_prices[power_level] + (5 * max([intelligence, strength, durability, speed, combat, power]))

    if price >= 2000: price_bracket = 5
    elif 2000 > price >= 1500: price_bracket = 4
    elif 1500 > price >= 1000: price_bracket = 3
    elif 1000 > price >= 500: price_bracket = 2
    else: price_bracket = 1

    power_level = CardPowerLevel.objects.get(power_level=power_level).id
    price_bracket = CardPriceBracket.objects.get(value=price_bracket).id

    card_dict.update({
      'level': power_level,
      'price_bracket': price_bracket,
      'overall': overall,
      'price': price
    })

    return card_dict

  def put(self, request, pk):
    chosen_card = PlayingCard.objects.get(pk=pk)
    card_data = PlayingCardSerializer(chosen_card).data

    card_data.update(request.data)
    card_data = self.update_stats(card_data)
    updated_card = PlayingCardSerializer(chosen_card, data=card_data)
    if updated_card.is_valid():
      updated_card.save()
      return Response(updated_card.data, status=HTTP_202_ACCEPTED)
    return Response({'message: SOMETHING IS VERY WRONG!!!'}, HTTP_406_NOT_ACCEPTABLE)

## Card Transactions
class BuySingleCard(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, request, pk):
    buyer = User.objects.get(pk=request.user.id)
    buyer_data = UserSerializer(buyer).data

    chosen_card = PlayingCard.objects.get(pk=pk)
    card_data = PlayingCardSerializer(chosen_card).data

    if buyer_data['coins'] >= card_data['price'] and card_data['owner'] != buyer.id:
      buyer_data['coins'] -= card_data['price']
      card_data['owner'] = buyer.id
    elif card_data['owner'] == buyer.id:
      return Response({'message: You already own that card'}, status=HTTP_200_OK)
    else: 
      return Response({'message: You can\'t afford that mate'}, status=HTTP_406_NOT_ACCEPTABLE)
    
    updated_buyer = UserSerializer(buyer, data=buyer_data)
    updated_card = PlayingCardSerializer(chosen_card, data=card_data)
    if updated_buyer.is_valid(): 
      updated_buyer.save()
      if updated_card.is_valid():
        updated_card.save()
      return Response(updated_card.data, status=HTTP_200_OK)
    
    return Response({'message: SOMETHING IS VERY WRONG!!!'}, status=HTTP_422_UNPROCESSABLE_ENTITY)

class SellSingleCard(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, request, pk):
    admin = User.objects.get(username='admin')
    seller = User.objects.get(pk=request.user.id)
    seller_data = UserSerializer(seller).data

    token = request.headers.get('Authorization')
    print(token)

    chosen_card = PlayingCard.objects.get(pk=pk)
    card_data = PlayingCardSerializer(chosen_card).data

    if card_data['owner'] == seller.id: seller_data['coins'] += card_data['price']
    else: return Response({'message': 'UNAUTHORIZED!!! GET OUT OF HERE!!!'})
    card_data['owner'] = admin.id

    for coll_Id in seller_data['collections']:
      put_res = requests.get(
        url = f'http://localhost:8000/api/collections/{coll_Id}/remove-card/', 
        json={'cardIds': [chosen_card.id]}, 
        headers={
          'Authorization': token
        }
      )

    updated_seller = UserSerializer(seller, data=seller_data)
    updated_card = PlayingCardSerializer(chosen_card, data=card_data)

    if updated_card.is_valid():
      updated_card.save()
      if updated_seller.is_valid():
        updated_seller.save()
      return Response(updated_seller.data, status=HTTP_200_OK)

    return Response({'message: SOMETHING IS VERY WRONG!!!'}, status=HTTP_422_UNPROCESSABLE_ENTITY)


class ManyCards(APIView):

  def get(self, _request):
    my_cards = PlayingCard.objects.all()
    serial_cards = PopulatedCardSerializer(my_cards, many=True)
    return Response(serial_cards.data, status=HTTP_200_OK)
  
  def post(self, request):
    self.request.POST._mutable = True

    request.data.hero = Hero.objects.get(pk=request.data['hero']).id
    request.data.level = CardPowerLevel.objects.get(power_level=request.data['level']).id
    request.data.price_bracket = CardPriceBracket.objects.get(value=request.data['price_bracket']).id

    new_card = PlayingCardSerializer(data=request.data)
    if new_card.is_valid():
      new_card.save()
      return Response(new_card.data, status=HTTP_201_CREATED)
    return Response(new_card.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


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
