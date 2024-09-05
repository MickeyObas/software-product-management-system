from rest_framework import serializers

from accounts.serializers import UserSerializer

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
    user = UserSerializer()
    class Meta:
        model = CardCommentItem
        fields = [
            'id',
            'user',
            'text',
            'created_at'
        ]