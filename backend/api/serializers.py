from rest_framework import serializers

from .models import Student, Item
from accounts.models import CustomUser

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = '__all__'


class StudentSerialzer2(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    d_o_b = serializers.DateField()
    dept = serializers.CharField(max_length=50)

    def create(self, validated_data):

        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.d_o_b = validated_data.get('d_o_b')
        instance.dept = validated_data.get('dept')
        return super().update(instance, validated_data)
    

class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

    class Meta:
        model = CustomUser
        fields = ['id', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}


class ItemSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')
    class Meta:
        model = Item
        fields = ['title', 'price', 'description', 'owner']
