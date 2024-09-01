from django.shortcuts import render

from rest_framework import response, status
from rest_framework.decorators import api_view

@api_view(['GET'])
def user_detail(request):
    pass
