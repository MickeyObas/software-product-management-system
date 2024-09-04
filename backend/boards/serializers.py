from rest_framework import serializers

from .models import Board, List
from cards.serializers import (
    CardSerializer
)


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = [
            "id",
            "admins",
            "product",
            "title",
            "description",
            "visibility"
        ]

class ListSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only=True)
    class Meta:
        model = List
        fields = [
            "id",
            "board",
            "title", 
            "order",
            "cards"
        ]