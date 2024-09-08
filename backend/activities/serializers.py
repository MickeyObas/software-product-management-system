from rest_framework import serializers

from .models import Activity
from accounts.serializers import UserSerializer


class ActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Activity
        fields = '__all__'