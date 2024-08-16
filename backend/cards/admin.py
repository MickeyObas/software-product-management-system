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

admin.site.register(Card)
admin.site.register(Label)
admin.site.register(Checklist)
admin.site.register(CardDateItem)
admin.site.register(CardCoverItem)
admin.site.register(ChecklistItem)
admin.site.register(CardCommentItem)
admin.site.register(CardAttachmentItem)