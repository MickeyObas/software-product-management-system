from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .models import Product
from boards.models import Board
from workspaces.models import Workspace
from .serializers import (
    ProductSerialzer,
)
from boards.serializers import (
    BoardSerializer,
    ListSerializer
)


@api_view(['POST'])
def create_product(request):
    if request.method == 'POST':
        serializer = ProductSerialzer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def product_list(request):
    user_products = Product.objects.filter(owner=request.user)
    serializer = ProductSerialzer(user_products, many=True)
    return Response(serializer.data)



