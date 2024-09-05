from rest_framework import serializers

from .models import (
    Card,
    CardCommentItem
)


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card 
        fields = [
            'id',
            'list',
            'title',
            'is_watched', 
            'description',
            'members',
            'order',
            'labels'
        ]


class CardCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardCommentItem
        fields = [
            'id',
            'user',
            'text',
            'created_at'
        ]