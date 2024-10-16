from django.urls import path

from . import views 

urlpatterns = [
    path('<int:pk>/delete/', views.delete_card, name='delete-card'),
    path('<int:pk>/description/', views.update_card_description, name='card-description-update'),
    path('<int:card_id>/comments/', views.card_comment_list_or_create, name='card-comment-add'),
    path('<int:card_id>/comments/<int:comment_id>/', views.card_comment_update_or_delete, name='card-comment-update-or-delete')
]