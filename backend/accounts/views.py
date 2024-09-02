from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import CustomUser
from .serializers import UserSerializer
from profiles.models import (
    AdminProfile,
    ClientProfile,
    DeveloperProfile,
    ProductManagerProfile
)

@api_view(['GET'])
def user_detail(request):
    user = request.user
    serializer = UserSerializer(user)
    print(serializer.data)
    return Response(serializer.data)