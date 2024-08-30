from rest_framework import serializers

from .models import Product, Board


class ProductSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "workspace",
            "title",
            "type",
            "description",
            "owner",
            "teams",
            "status",
            "version",
            "repository_url",
            "documentation_url"
        ]


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = [
            "admins",
            "product",
            "title",
            "description",
            "visibility"
        ]