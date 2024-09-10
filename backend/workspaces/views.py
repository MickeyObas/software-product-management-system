from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import WorkspaceSerializer
from .models import Workspace

from products.models import Product
from boards.models import Board
from accounts.models import CustomUser
from products.serializers import ProductSerialzer
from boards.serializers import BoardSerializer
from activities.utils import log_activity


@api_view(['POST'])
def create_workspace(request):
    if request.method == 'POST':
        serializer = WorkspaceSerializer(data=request.data)
        if serializer.is_valid():
            workspace = serializer.save(owner=request.user)
            
            log_activity(
                user=request.user, 
                obj=workspace, 
                action_type='created',
                activity_type='workspace_created',
                description=f"Created workspace: {workspace.title}",
                workspace=workspace
            )

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
    # Get workspaces where the user is either the owner or a member
    user_workspaces = Workspace.objects.filter(owner=request.user) | Workspace.objects.filter(members=request.user)
    
    # Ensure distinct results in case the user is both owner and member of some workspaces
    user_workspaces = user_workspaces.distinct()
    
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


@api_view(['POST'])
def add_member(request, pk):
    email = request.data.get('email')
    try:
        user = CustomUser.objects.get(email=email)
        workspace = Workspace.objects.get(id=pk)
        if workspace.owner != request.user:
            return Response({"detail": "You are not the owner of this workspace."}, status=403)
        workspace.members.add(user)
        return Response({"detail": "Member added successfully."}, status=200)
    except CustomUser.DoesNotExist:
        return Response({"detail": "User not found."}, status=404)
    except Workspace.DoesNotExist:
        return Response({"detail": "Workspace not found."}, status=404)
