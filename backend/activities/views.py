from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Activity
from workspaces.models import Workspace
from .serializers import ActivitySerializer

@api_view(['GET'])
def activity_feed_list(request):
    try:
        # Get workspaces where the user is either the owner or a member
        user_workspaces = Workspace.objects.filter(owner=request.user) | Workspace.objects.filter(members__id=request.user.id)
        user_workspaces = user_workspaces.distinct()

        # Fetch the most recent 10 activities related to these workspaces
        activities = Activity.objects.filter(workspace__in=user_workspaces).order_by('-timestamp')[:10]
        
        # Serialize the activities
        serializer = ActivitySerializer(activities, many=True)

        # Return serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        # Handle unexpected errors
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

 