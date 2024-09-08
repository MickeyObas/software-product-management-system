from rest_framework import serializers

from accounts.serializers import UserSerializer

from .models import (
    Card,
    CardCommentItem
)


class CardSerializer(serializers.ModelSerializer):
    list_name = serializers.SerializerMethodField()
    workspace_name = serializers.SerializerMethodField()

    def get_list_name(self, obj):
        return obj.list.title

    def get_workspace_name(Self, obj):
        return obj.list.board.product.workspace.title
    
    class Meta:
        model = Card 
        fields = [
            'id',
            'list',
            'list_name',
            'workspace_name',
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


