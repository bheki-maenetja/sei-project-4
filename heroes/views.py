# pylint: disable=no-member

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY
from .serializers import HeroSerializer
# Create your views here.

from .models import Hero

class SingleHero(APIView):

  def get(self, _request, pk):
    try:
      my_hero = Hero.objects.get(pk=pk)
      serial_hero = HeroSerializer(my_hero)
      return Response(serial_hero.data, status=HTTP_200_OK)
    except Hero.DoesNotExist:
      return Response({'message': 'Hero not found'}, status=HTTP_404_NOT_FOUND)

class ManyHeroes(APIView):
  
  def get(self, _request):
    my_heroes = Hero.objects.all()
    serial_heroes = HeroSerializer(my_heroes, many=True)
    return Response(serial_heroes.data, status=HTTP_200_OK)

  def post(self, request):
    hero = HeroSerializer(request.data)
    if hero.is_valid():
      hero.save()
      return Response(hero.data, status=HTTP_201_CREATED)
    return Response(hero.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
