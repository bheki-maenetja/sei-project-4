from django.contrib import admin
from .models import PlayingCard, CardPowerLevel, CardPriceBracket
# Register your models here.
admin.site.register(PlayingCard)
admin.site.register(CardPowerLevel)
admin.site.register(CardPriceBracket)