from  rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Board, List
from .serializers import BoardSerializer, ListSerializer

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