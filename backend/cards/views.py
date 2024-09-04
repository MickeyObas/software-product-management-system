from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .models import Card
from .serializers import CardSerializer
from boards.models import List
from boards.serializers import ListSerializer

import json


@api_view(['POST'])
def add_new_card_to_list(request, list_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        try:
            list = List.objects.get(
                id=list_id
            )
        except List.DoesNotExist:
            return Response(status=status.HTTP_404_DOES_NOT_EXIST)
        
        new_card = Card.objects.create(
            list=list,
            title=data['title']
        )

        new_card.save()

        serializer = ListSerializer(list)

        return Response(serializer.data)




