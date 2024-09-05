from django.urls import path

from . import views 

urlpatterns = [
    path('<int:pk>/description/', views.update_card_description, name='card-description-update'),
    path('<int:card_id>/comments/', views.card_comment_list_or_create, name='card-comment-add')
]