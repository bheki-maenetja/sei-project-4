from django.urls import path
from .views import SingleCard, ManyCards, SinglePowerLevel, ManyPowerLevels, SinglePriceBracket, ManyPriceBrackets

urlpatterns = [
  path('', ManyCards.as_view()),
  path('<int:pk>/', SingleCard.as_view()),
  path('power-levels/', ManyPowerLevels.as_view()),
  path('power-levels/<int:pk>/', SinglePowerLevel.as_view()),
  path('prices/', ManyPriceBrackets.as_view()),
  path('prices/<int:pk>/', SinglePriceBracket.as_view())
]