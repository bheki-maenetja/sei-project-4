import json
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED, HTTP_406_NOT_ACCEPTABLE
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer, UpdateUserSerializer, PopulatedUserSerializer
User = get_user_model()

class RegisterView(APIView):

  def post(self, request):
    serialized_user = UserSerializer(data=request.data)
    
    if serialized_user.is_valid():
      serialized_user.save()
      return Response({'message': 'Registration Successful'})

    return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
      user = User.objects.get(email=email)

      if not user.check_password(password):
        raise PermissionDenied({'message': 'Invalid Credentials'})

      dt = datetime.now() + timedelta(days=7)
      token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')

      return Response({'token': token, 'message': f'Welcome back {user.username}'})
    except User.DoesNotExist:
      raise PermissionDenied({'message': 'Invalid Credentials'})

class ProfileView(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, request):
    try:
      user = User.objects.get(pk=request.user.id)
      serialized_user = PopulatedUserSerializer(user)
      return Response(serialized_user.data, status=HTTP_200_OK)
    except User.DoesNotExist:
      return Response({'message': 'User not found'}, status=HTTP_404_NOT_FOUND)

class UpdateProfile(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, request):
    playerData = request.headers.get('Playerdata')
    playerData = json.loads(playerData)
    
    try:
      user = User.objects.get(pk=request.user.id)
      user_data = UpdateUserSerializer(user).data
    except User.DoesNotExist:
      return Response({'message: User not found'}, status=HTTP_404_NOT_FOUND)

    user_data.update(playerData)
    updated_user = UpdateUserSerializer(user, data=user_data)
    if updated_user.is_valid():
      updated_user.save()
      return Response(updated_user.data, HTTP_202_ACCEPTED)
    print(updated_user.data)

    return Response({'message: SOMETHING IS VERY WRONG!!!'}, status=HTTP_406_NOT_ACCEPTABLE)