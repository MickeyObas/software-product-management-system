from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Image
from .serializers import ImageSerializer


@api_view(['POST'])
def upload_image(request):
    if 'image' not in request.FILES:
        return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

    image_file = request.FILES['image']
    image = Image(image=image_file)
    image.save()

    image_url = request.build_absolute_uri(image.image.url)
    response_data = {
        'id': image.id,
        'image_url': image_url
    }
    
    # serializer = ImageSerializer(image)
    return Response(response_data, status=status.HTTP_201_CREATED)
