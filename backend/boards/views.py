from  rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Board, List
from cards.models import Card
from .serializers import (
    BoardSerializer,
    ListSerializer,
    CardSerializer
)
from activities.utils import log_activity

import json



@api_view(['GET'])
def lists_for_board(request, pk):
    try:
        board = Board.objects.get(id=pk)
    except Board.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    board_lists = List.objects.filter(
        board=board,
        board__product__owner=request.user
    )

    serializer = ListSerializer(board_lists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def list_detail(request, pk, list_id):
    try:
        board = Board.objects.get(id=pk)
    except Board.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    try:
        list = List.objects.get(
            board=board,
            id=list_id
        )
    except List.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = ListSerializer(list)
    return Response(serializer.data)
    

@api_view(['POST'])
def add_new_card_to_list(request, pk, list_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        try:
            list = List.objects.get(
                id=list_id
            )
            board = Board.objects.get(
                id=pk
            )
        except List.DoesNotExist or Board.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        new_card = Card.objects.create(
            list=list,
            title=data['title']
        )

        new_card.save()

        extra_data = {
            "board_title": new_card.list.board.title,
            "workspace_title": new_card.list.board.product.workspace.title,
            "list_title": new_card.list.title
        }

        log_activity(
            user=request.user,
            obj=new_card,
            extra_data=extra_data,
            action_type='create',
            activity_type='card_created',
            description=f"Created card: {new_card.title}"
        )

        serializer = CardSerializer(new_card)

        return Response(serializer.data)
    