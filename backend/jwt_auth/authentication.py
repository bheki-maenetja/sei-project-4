from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

User = get_user_model()

class JWTAuthentication(BasicAuthentication):

  def authenticate(self, request):
    header = request.headers.get('Authorization')
    # print(request.headers)
    if header != None: header = header.replace('Basic ', 'Bearer ')
    # print(header)

    if not header: return None

    if not header.startswith('Bearer'):
      raise PermissionDenied({'message': 'Invalid authorization header'})

    token = header.replace('Bearer ', '')
    # print(token)

    try:
      payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
      user = User.objects.get(pk=payload.get('sub'))
    except jwt.exceptions.InvalidTokenError:
      raise PermissionDenied({'message': 'Invalid Token Error'})
    except User.DoesNotExist:
      raise PermissionDenied({'message': 'No User Found'})

    return (user, token)