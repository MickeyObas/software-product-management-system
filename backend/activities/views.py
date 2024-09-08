from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Activity
from .serializers import ActivitySerializer

@api_view(['GET'])
def activity_feed_list(request):
    try:
        # Fetch the most recent 10 activities ordered by creation time
        activities = Activity.objects.filter(user=request.user).order_by('-timestamp')[:10]
        # Serialize the activities
        serializer = ActivitySerializer(activities, many=True)
        # Return serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        # Handle unexpected errors
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
