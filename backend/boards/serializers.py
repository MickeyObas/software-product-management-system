from rest_framework import serializers

from .models import Board, List


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
    class Meta:
        model = List
        fields = [
            "id",
            "board",
            "title", 
            "order"
        ]