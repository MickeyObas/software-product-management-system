from django.contrib import admin

from .models import (
    Card,
    Label,
    Checklist,
    CardDateItem,
    CardCoverItem,
    ChecklistItem,
    CardCommentItem,
    CardAttachmentItem
)

class CardModelAdmin(admin.ModelAdmin):
    def card_board(self, obj):
        return obj.list.board
    
    def card_workspace(self, obj):
        return obj.list.board.product.workspace
    

    list_display = [
        "id",
        "title",
        "list",
        "card_board",
        "card_workspace"
    ]

class CardCommentItemModelAdmin(admin.ModelAdmin):
    def card_id(self, obj):
        return obj.card.id
    
    list_display = [
        'id',
        'user',
        'card_id',
        'text'
    ]

admin.site.register(Card, CardModelAdmin)
admin.site.register(Label)
admin.site.register(Checklist)
admin.site.register(CardDateItem)
admin.site.register(CardCoverItem)
admin.site.register(ChecklistItem)
admin.site.register(CardCommentItem, CardCommentItemModelAdmin)
admin.site.register(CardAttachmentItem)