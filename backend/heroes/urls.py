from django.urls import path
from .views import SingleHero, ManyHeroes

urlpatterns = [
  path('', ManyHeroes.as_view()),
  path('<int:pk>', SingleHero.as_view())
]