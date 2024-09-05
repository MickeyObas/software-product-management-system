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

import json


@api_view(['POST'])
def add_new_card_to_list(request, list_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        try:
            list = List.objects.get(
                id=list_id
            )
        except List.DoesNotExist:
            return Response(status=status.HTTP_404_DOES_NOT_EXIST)
        
        new_card = Card.objects.create(
            list=list,
            title=data['title']
        )

        new_card.save()

        serializer = ListSerializer(list)

        return Response(serializer.data)


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


@api_view(['GET', 'POST'])
def card_comment_list_or_create(request, card_id):
    try:
        card = Card.objects.get(id=card_id)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # Getting a card's comments
    if request.method == 'GET':
        card_comments = card.comments.all()

        serializer = CardCommentSerializer(
            card_comments,
            many=True
        )

        if serializer.is_valid:
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # Adding a comment to a card
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

        serializer = CardCommentSerializer(new_card_comment)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


    
    


        



