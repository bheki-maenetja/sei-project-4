# pylint: disable=no-member

from django.shortcuts import render
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY
from .serializers import CardCollectionSerializer, PowerLevelSerializer, PriceBracketSerializer, PopulatedCollectionSerializer

from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import CardCollection, CollectionPowerLevel, CollectionPriceBracket

# Views -- Card Collections
class SingleCollection(APIView):

  def get(self, _request, pk):
    try:
      my_collection = CardCollection.objects.get(pk=pk)
      serial_collection = PopulatedCollectionSerializer(my_collection)
      return Response(serial_collection.data, status=HTTP_200_OK)
    except CardCollection.DoesNotExist:
      return Response({'message: Collection not found'}, status=HTTP_404_NOT_FOUND)

  def put(self, request, pk):
    pass

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