from django.contrib import admin
from .models import CardCollection, CollectionPowerLevel, CollectionPriceBracket
# Register your models here.
admin.site.register(CardCollection)
admin.site.register(CollectionPowerLevel)
admin.site.register(CollectionPriceBracket)