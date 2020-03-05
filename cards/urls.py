from django.urls import path
from .views import SingleCard, ManyCards, BuySingleCard, SellSingleCard, LevelUpCard,SinglePowerLevel, ManyPowerLevels, SinglePriceBracket, ManyPriceBrackets

urlpatterns = [
  path('', ManyCards.as_view()),
  path('<int:pk>/', SingleCard.as_view()),
  path('<int:pk>/buy/', BuySingleCard.as_view()),
  path('<int:pk>/sell/', SellSingleCard.as_view()),
  path('<int:pk>/level-up/', LevelUpCard.as_view()),
  path('power-levels/', ManyPowerLevels.as_view()),
  path('power-levels/<int:pk>/', SinglePowerLevel.as_view()),
  path('price-brackets/', ManyPriceBrackets.as_view()),
  path('price-brackets/<int:pk>/', SinglePriceBracket.as_view())
]