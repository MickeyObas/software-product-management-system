from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .models import Card, CardCommentItem
from .serializers import (
    CardSerializer,
    CardCommentSerializer
)
from boards.models import List
from boards.serializers import ListSerializer
from activities.utils import log_activity

import json


@api_view(['DELETE'])
def delete_card(request, pk):
    
    try:
        card = Card.objects.get(id=pk)
    except Card.DoesNotExist:
        return Response({"error": "Card not found"}, status=status.HTTP_404_NOT_FOUND)
    
    card.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['PATCH'])
def update_card_description(request, pk):

    data = json.loads(request.body)

    try:
        card = Card.objects.get(pk=pk)
    except Card.DoesNotExist:
        return Response({"error": "Card not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = CardSerializer(
        card,
        partial=True,
        data=data
        )
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------COMMENT ENDPOINTS-------------------
@api_view(['GET', 'POST'])
def card_comment_list_or_create(request, card_id):
    try:
        card = Card.objects.get(id=card_id)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        card_comments = card.comments.order_by('-created_at')

        serializer = CardCommentSerializer(
            card_comments,
            many=True
        )

        if serializer.is_valid:
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'POST':
        data = request.data
        user = request.user
        comment_text = data.get('comment', '')

        if not comment_text:
            return Response({"error": "Comment text is required"}, status=status.HTTP_400_BAD_REQUEST)

        new_card_comment = CardCommentItem(
            user=user,
            card=card, 
            text=comment_text
        )

        new_card_comment.save()

        extra_data = {
            'card_title': card.title,
            'card_list_title': card.list.title,
            'card_board_title': card.list.board.title,
            'card_workspace_title': card.list.board.product.workspace.title
        }

        log_activity(
            user=request.user,
            obj=new_card_comment,
            extra_data=extra_data,
            action_type='create',
            activity_type='comment_added',
            description=f"Added Comment: '{new_card_comment.text}' ",
            workspace=card.list.board.product.workspace
        )

        serializer = CardCommentSerializer(new_card_comment)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE', 'PATCH'])
def card_comment_update_or_delete(request, card_id, comment_id):
    try:
        card = Card.objects.get(id=card_id)
        comment = CardCommentItem.objects.get(
            id=comment_id,
            user=request.user
        )
    except Card.DoesNotExist or CardCommentItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "DELETE":
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    if request.method == "PATCH":
        data = json.loads(request.body)
    
        serializer = CardCommentSerializer(
            comment,
            partial=True,
            data=data
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


    



    
    


        



