# pylint: disable=no-member

from django.shortcuts import render
from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_406_NOT_ACCEPTABLE, HTTP_401_UNAUTHORIZED, HTTP_204_NO_CONTENT
from .serializers import CardCollectionSerializer, PowerLevelSerializer, PriceBracketSerializer, PopulatedCollectionSerializer, UserSerializer, PlayingCardSerializer, PlayingCardTransactionSerializer

from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import CardCollection, CollectionPowerLevel, CollectionPriceBracket
from cards.models import PlayingCard

User = get_user_model()

# Views -- Card Collections
class SingleCollection(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, _request, pk):
    try:
      my_collection = CardCollection.objects.get(pk=pk)
      serial_collection = PopulatedCollectionSerializer(my_collection)
      return Response(serial_collection.data, status=HTTP_200_OK)
    except CardCollection.DoesNotExist:
      return Response({'message: Collection not found'}, status=HTTP_404_NOT_FOUND)

  def put(self, request, pk):
    chosen_collection = CardCollection.objects.get(pk=pk)
    collection_data = CardCollectionSerializer(chosen_collection).data

    if request.user.id != collection_data['owner']: return Response({'message': 'UNAUTHORIZED!!! GET OUT OF HERE!!!'})

    collection_data.update(request.data)
    updated_collection = CardCollectionSerializer(chosen_collection, data=collection_data)
    if updated_collection.is_valid():
      updated_collection.save()
      return Response(updated_collection.data, status=HTTP_202_ACCEPTED)
    return Response({'message: SOMETHING IS VERY WRONG!!!'}, status=HTTP_406_NOT_ACCEPTABLE)

  def delete(self, request, pk):
    try:
      collection = CardCollection.objects.get(pk=pk)
      if request.user.id != collection.owner.id: return Response(status=HTTP_401_UNAUTHORIZED)
      collection.delete()
      return Response(status=HTTP_204_NO_CONTENT)
    except collection.DoesNotExist:
      return Response({'message': 'Collection not Found'}, status=HTTP_404_NOT_FOUND)

## Adding Cards to Collection
class AddCardToCollection(APIView):
  
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def update_collection_stats(self, coll_dict):
    power_sum = 0 
    value = 0

    for card in coll_dict['cards']:
      new_card = PlayingCard.objects.get(pk=card)
      power_sum += new_card.overall
      value += new_card.price
    
    avg_overall = power_sum // len(coll_dict['cards']) if len(coll_dict['cards']) > 0 else 0
    price = value // len(coll_dict['cards']) if len(coll_dict['cards']) > 0 else 0

    if avg_overall >= 90: avg_level = 5
    elif 90 > avg_overall >= 70: avg_level = 4
    elif 70 > avg_overall >= 50: avg_level = 3
    elif 50 > avg_overall >= 30: avg_level = 2
    elif 30 > avg_overall > 0: avg_level = 1
    else: avg_level = 0

    if price >= 2000: price_bracket = 5
    elif 2000 > price >= 1500: price_bracket = 4
    elif 1500 > price >= 1000: price_bracket = 3
    elif 1000 > price >= 500: price_bracket = 2
    elif 500 > price > 0: price_bracket = 1
    else: price_bracket = 0

    print(f'Average Overall: {avg_overall}\nAverage Price: {price}\nPrice Bracket: {price_bracket}\nAverage Power Level: {avg_level}')
    avg_level = CollectionPowerLevel.objects.get(power_level=avg_level).id
    price_bracket = CollectionPriceBracket.objects.get(value=price_bracket).id

    coll_dict.update({
      'avg_level': avg_level,
      'price_bracket': price_bracket,
      'avg_overall': avg_overall,
      'value': 0.8 * value
    })

    return coll_dict

  def get(self, request, pk):
    chosen_collection = CardCollection.objects.get(pk=pk)
    collection_data = CardCollectionSerializer(chosen_collection).data

    if request.user.id != collection_data['owner']: return Response({'message': 'UNAUTHORIZED!!! GET OUT OF HERE!!!'})

    for cardId in request.data['cardIds']:
      try:
        chosen_card = PlayingCard.objects.get(pk=cardId)
        if chosen_card.id not in collection_data['cards']:
          collection_data['cards'].append(chosen_card.id)
        elif chosen_card.id in collection_data['cards']:
          return Response({'message': 'Card Already added'}, status=HTTP_200_OK)
      except chosen_card.DoesNotExist:
        return Response({'message: Card not found'}, status=HTTP_404_NOT_FOUND)

    collection_data = self.update_collection_stats(collection_data)
    updated_collection = CardCollectionSerializer(chosen_collection, data=collection_data)
    if updated_collection.is_valid():
      updated_collection.save()
      return Response(updated_collection.data, status=HTTP_202_ACCEPTED)

    return Response({'message: SOMETHING IS VERY WRONG!!!'}, status=HTTP_406_NOT_ACCEPTABLE)

class RemoveCardFromCollection(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def update_collection_stats(self, coll_dict):
    power_sum = 0 
    value = 0

    for card in coll_dict['cards']:
      new_card = PlayingCard.objects.get(pk=card)
      power_sum += new_card.overall
      value += new_card.price
    
    avg_overall = power_sum // len(coll_dict['cards']) if len(coll_dict['cards']) > 0 else 0
    price = value // len(coll_dict['cards']) if len(coll_dict['cards']) > 0 else 0

    if avg_overall >= 90: avg_level = 5
    elif 90 > avg_overall >= 70: avg_level = 4
    elif 70 > avg_overall >= 50: avg_level = 3
    elif 50 > avg_overall >= 30: avg_level = 2
    elif 30 > avg_overall > 0: avg_level = 1
    else: avg_level = 0

    if price >= 2000: price_bracket = 5
    elif 2000 > price >= 1500: price_bracket = 4
    elif 1500 > price >= 1000: price_bracket = 3
    elif 1000 > price >= 500: price_bracket = 2
    elif 500 > price > 0: price_bracket = 1
    else: price_bracket = 0

    avg_level = CollectionPowerLevel.objects.get(power_level=avg_level).id
    price_bracket = CollectionPriceBracket.objects.get(value=price_bracket).id

    coll_dict.update({
      'avg_level': avg_level,
      'price_bracket': price_bracket,
      'avg_overall': avg_overall,
      'value': 0.8 * value
    })

    return coll_dict

  def get(self, request, pk):
    chosen_collection = CardCollection.objects.get(pk=pk)
    collection_data = CardCollectionSerializer(chosen_collection).data

    if request.user.id != collection_data['owner']: return Response({'message': 'UNAUTHORIZED!!! GET OUT OF HERE!!!'})

    for cardId in request.data['cardIds']:
      try:
        chosen_card = PlayingCard.objects.get(pk=cardId)
        if chosen_card.id in collection_data['cards']:
          collection_data['cards'].remove(chosen_card.id)
        elif chosen_card.id not in collection_data['cards']:
          return Response({'message': 'Card already removed'}, status=HTTP_200_OK)
      except chosen_card.DoesNotExist:
        return Response({'message: Card not found'}, status=HTTP_404_NOT_FOUND)

    collection_data = self.update_collection_stats(collection_data)
    updated_collection = CardCollectionSerializer(chosen_collection, data=collection_data)
    if updated_collection.is_valid():
      updated_collection.save()
      return Response(updated_collection.data, status=HTTP_202_ACCEPTED)

    return Response({'message: SOMETHING IS VERY WRONG!!!'}, status=HTTP_406_NOT_ACCEPTABLE)

## Collection Transactions
class BuyCollection(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, request, pk):
    buyer = User.objects.get(pk=request.user.id)
    buyer_data = UserSerializer(buyer).data

    chosen_collection = CardCollection.objects.get(pk=pk)
    collection_data = CardCollectionSerializer(chosen_collection).data

    if buyer.coins >= chosen_collection.value and chosen_collection.owner.id != request.user.id:
      buyer_data['coins'] -= chosen_collection.value
      collection_data['owner'] = buyer.id
      for cardId in collection_data['cards']:
        new_card = PlayingCard.objects.get(pk=cardId)
        new_card_data = PlayingCardTransactionSerializer(new_card).data
        new_card_data['owner'] = buyer.id 
        updated_card = PlayingCardTransactionSerializer(new_card, data=new_card_data)
        if updated_card.is_valid(): updated_card.save()
        else: print('Card not updating')
    elif chosen_collection.owner.id == request.user.id:
      return Response({'message': 'You already have this collection'}, status=HTTP_200_OK)
    else:
      return Response({'message': 'You can\'t afford that mate'})
    
    updated_buyer = UserSerializer(buyer, data=buyer_data)
    updated_collection = CardCollectionSerializer(chosen_collection, data=collection_data)
    
    if updated_buyer.is_valid():
      updated_buyer.save()
      if updated_collection.is_valid():
        updated_collection.save()
      return Response(updated_collection.data, status=HTTP_202_ACCEPTED)
    return Response({'message': 'SOMETHING IS VERY WRONG!!!'}, status=HTTP_406_NOT_ACCEPTABLE)

class SellCollection(APIView):
  
  permission_classes = (IsAuthenticated, )

  def get(self, request, pk):
    admin = User.objects.get(username='admin')
    seller = User.objects.get(pk=request.user.id)
    seller_data = UserSerializer(seller).data

    chosen_collection = CardCollection.objects.get(pk=pk)
    collection_data = CardCollectionSerializer(chosen_collection).data

    if request.user.id != collection_data['owner']: return Response({'message': 'UNAUTHORIZED!!! GET OUT OF HERE!!!'})

    if collection_data['owner'] == seller.id: seller_data['coins'] += collection_data['value']
    collection_data['owner'] = admin.id 

    for cardId in collection_data['cards']:
      new_card = PlayingCard.objects.get(pk=cardId)
      new_card_data = PlayingCardTransactionSerializer(new_card).data
      new_card_data['owner'] = admin.id 
      updated_card = PlayingCardTransactionSerializer(new_card, data=new_card_data)
      if updated_card.is_valid(): updated_card.save()
      else: print('Card not updating')
    
    updated_seller = UserSerializer(seller, data=seller_data)
    updated_collection = CardCollectionSerializer(chosen_collection, data=collection_data)

    if updated_seller.is_valid():
      updated_seller.save()
      if updated_collection.is_valid():
        updated_collection.save()
      return Response(updated_seller.data, status=HTTP_202_ACCEPTED)
    
    return Response({'message': 'SOMETHING IS VERY WRONG!!!'}, status=HTTP_406_NOT_ACCEPTABLE)

class ManyCollections(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, _request):
    my_collections = CardCollection.objects.all()
    serial_collections = PopulatedCollectionSerializer(my_collections, many=True)
    return Response(serial_collections.data, status=HTTP_200_OK)
  
  def post(self, request):
    request.data['owner'] = request.user.id
    request.data['avg_level'] = CollectionPowerLevel.objects.get(power_level=0).id
    request.data['price_bracket'] = CollectionPriceBracket.objects.get(value=0).id

    new_collection = CardCollectionSerializer(data=request.data)
    if new_collection.is_valid():
      new_collection.save()
      return Response(new_collection.data, status=HTTP_201_CREATED)
    return Response(new_collection.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

# Views -- CardCollection Powerlevels
class ManyPowerLevels(APIView):

  def get(self, _request):
    my_levels = CollectionPowerLevel.objects.all()
    serial_levels = PowerLevelSerializer(my_levels, many=True)
    return Response(serial_levels.data, status=HTTP_200_OK)

class SinglePowerLevel(APIView):

  def get(self, _request, pk):
    my_level = CollectionPowerLevel.objects.get(pk=pk)
    serial_level = PowerLevelSerializer(my_level)
    return Response(serial_level.data, status=HTTP_200_OK)

# Views -- CardCollection Price Brackets
class SinglePriceBracket(APIView):

  def get(self, _request, pk):
    my_bracket = CollectionPriceBracket.objects.get(pk=pk)
    serial_bracket = PriceBracketSerializer(my_bracket)
    return Response(serial_bracket.data, status=HTTP_200_OK)

class ManyPriceBrackets(APIView):

  def get(self, _request):
    my_brackets = CollectionPriceBracket.objects.all()
    serial_brackets = PriceBracketSerializer(my_brackets, many=True)
    return Response(serial_brackets.data, status=HTTP_200_OK)