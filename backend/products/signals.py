from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Product, Board

@receiver(post_save, sender=Product)
def create_boards_for_product(sender, instance, created, **kwargs):
    if created:
        board_creator = instance.owner
        board_data = []
        for i in range(1, 4):
            board_data.append({
                'product': instance,
                'title': f"Board {i}",
                'description': f"This is Board {i}."
            })
        for data in board_data:
            board = Board.objects.create(**data)
            board.admins.add(board_creator)
            board.save()