from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import WorkspaceSerializer
from .models import Workspace
from products.models import Board, Product
from products.serializers import ProductSerialzer, BoardSerializer


@api_view(['POST'])
def create_workspace(request):
    if request.method == 'POST':
        serializer = WorkspaceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def workspace_detail(request, pk):
    try:
        workspace = Workspace.objects.get(id=pk)
    except Workspace.DoesNotExist:
        return Response({"error": "Workspace not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = WorkspaceSerializer(workspace)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def workspace_list(request):
    user_workspaces = Workspace.objects.filter(owner=request.user)
    serializer = WorkspaceSerializer(user_workspaces, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def board_list(request, workspace_id):
    try:
        workspace = Workspace.objects.get(id=workspace_id)
    except Workspace.DoesNotExist:
        return Response({f'error': 'Workspace with ID: {workspace_id} not found'}, status=status.HTTP_404_NOT_FOUND)
    
    boards = Board.objects.filter(product__workspace=workspace)
    serializer = BoardSerializer(boards, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)
