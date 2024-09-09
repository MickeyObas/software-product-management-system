from rest_framework import serializers

from .models import Board, List, RecentlyViewedBoard, Favorite
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
            "is_starred",
            "description",
            "visibility"
        ]

class RecentlyViewedBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecentlyViewedBoard
        fields = '__all__'

class FavoriteSerializer(serializers.Serializer):
    board_id = serializers.IntegerField()

    def validate_board_id(self, value):
        try:
            Board.objects.get(id=value)
        except Board.DoesNotExist:
            raise serializers.ValidationError("Board does not exist")
        return value

    def update(self, instance, validated_data):
        board = Board.objects.get(id=validated_data['board_id'])
        favorite, created = Favorite.objects.get_or_create(user=instance, board=board)
        if not created:
            favorite.delete()  # If it already exists, remove the favorite (toggle behavior)
        return instance

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