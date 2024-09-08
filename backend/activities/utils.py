from django.contrib.contenttypes.models import ContentType
from django.core.serializers import serialize
import json

from .models import Activity

def log_activity(user, obj, action_type, activity_type, description, extra_data=None):
        content_type = ContentType.objects.get_for_model(obj)
        object_data = serialize('json', [obj])  # Serialize the object to JSON
        Activity.objects.create(
            user=user,
            action_type=action_type,
            extra_data=extra_data or '',
            activity_type=activity_type,
            content_type=content_type,
            object_id=obj.id,
            object_data=object_data,
            description=description
        )