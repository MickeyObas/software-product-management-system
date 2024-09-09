from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Board, List, RecentlyViewedBoard, Favorite
from .serializers import (
    BoardSerializer,
    ListSerializer,
    CardSerializer,
    FavoriteSerializer
)

from cards.models import Card
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
    

@api_view(['GET'])
def get_recently_viewed_boards(request):
    """
    Endpoint to retrieve the recently viewed boards for the current user.
    """
    user = request.user

    # Retrieve the user's recently viewed boards (limit to 5 most recent)
    recent_boards = RecentlyViewedBoard.objects.filter(user=user).order_by('-viewed_at')[:5]

    # Serialize the boards
    board_serializer = BoardSerializer([recent.board for recent in recent_boards], many=True)

    return Response(board_serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def is_favorite_board(request, pk):
    try:
        board = Board.objects.get(id=pk)
    except Board.DoesNotExist:
        return Response({'error': 'Board not found'}, status=404)

    is_favorite = Favorite.objects.filter(user=request.user, board=board).exists()
    return Response({'is_favorite': is_favorite}, status=200)


@api_view(['GET'])
def get_favorite_boards(request):
    try:
        favorites = Favorite.objects.filter(user=request.user)
        boards = [favorite.board for favorite in favorites]
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        print("Error: ", e)
        return Response(status=500)
    


@api_view(['POST'])
def toggle_favorite_board(request):
    serializer = FavoriteSerializer(data=request.data)

    if serializer.is_valid():
        serializer.update(request.user, serializer.validated_data)
        return Response({'message': 'Favorite toggled successfully'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_recently_viewed(request, pk):
    """
    Endpoint to update the recently viewed boards for the current user.
    """
    user = request.user

    # Try to get the board
    try:
        board = Board.objects.get(id=pk)
    except Board.DoesNotExist:
        return Response({"detail": "Board not found."}, status=status.HTTP_404_NOT_FOUND)

    # Update or create the RecentlyViewedBoard instance
    RecentlyViewedBoard.objects.update_or_create(
        user=user,
        board=board,
        defaults={'viewed_at': timezone.now()}
    )

    # Retrieve the user's recently viewed boards (limit to 5 most recent)
    recent_boards = RecentlyViewedBoard.objects.filter(user=user).order_by('-viewed_at')[:5]

    # Serialize the boards for the response
    board_serializer = BoardSerializer([recent.board for recent in recent_boards], many=True)

    return Response(board_serializer.data, status=status.HTTP_200_OK)

    