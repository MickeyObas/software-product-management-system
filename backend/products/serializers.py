from rest_framework import serializers

from .models import Product


class ProductSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
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