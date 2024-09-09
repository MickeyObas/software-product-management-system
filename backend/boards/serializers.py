from rest_framework import serializers

from .models import Board, List, RecentlyViewedBoard
from cards.serializers import (
    CardSerializer
)
from products.serializers import ProductSerialzer


class BoardSerializer(serializers.ModelSerializer):
    product = ProductSerialzer()
    workspace_title = serializers.SerializerMethodField()

    def get_workspace_title(self, obj):
        return obj.product.workspace.title

    class Meta:
        model = Board
        fields = [
            "id",
            "workspace_title",
            "admins",
            "product",
            "title",
            "description",
            "visibility"
        ]

class RecentlyViewedBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecentlyViewedBoard
        fields = '__all__'

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