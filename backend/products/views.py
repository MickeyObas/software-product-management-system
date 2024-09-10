from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .models import Product
from activities.utils import log_activity
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
            product = serializer.save(owner=request.user)

            log_activity(
                user=request.user,
                obj=product,
                action_type='created',
                activity_type='product_created',
                description=f"Created product: {product.title}",
                workspace=product.workspace
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def product_list(request):
    # Get products where the user is either the owner or a member of the workspace
    user_products = Product.objects.filter(owner=request.user) | Product.objects.filter(workspace__members__id=request.user.id)
    
    # Ensure distinct results in case the user is both owner and member of some workspaces
    user_products = user_products.distinct()
    
    serializer = ProductSerialzer(user_products, many=True)
    return Response(serializer.data)


