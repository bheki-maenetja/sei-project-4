from django.urls import path
from .views import SingleCollection, ManyCollections, SinglePowerLevel, SinglePriceBracket, ManyPowerLevels, ManyPriceBrackets

urlpatterns = [
  path('', ManyCollections.as_view()),
  path('<int:pk>/', SingleCollection.as_view()),
  path('prices/', ManyPriceBrackets.as_view()),
  path('prices/<int:pk>/', SinglePriceBracket.as_view()),
  path('power-levels/', ManyPowerLevels.as_view()),
  path('power-levels/<int:pk>/', SinglePowerLevel.as_view())
]