from django.urls import path
from .views import RegisterView, LoginView, ProfileView, UpdateProfile

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('my-profile/', ProfileView.as_view()),
  path('my-profile/update/', UpdateProfile.as_view())
]