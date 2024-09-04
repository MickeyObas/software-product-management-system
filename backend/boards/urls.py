from django.urls import path

from . import views 


urlpatterns = [
    path('<int:pk>/lists/', views.lists_for_board, name='lists_for_board'),
    path('<int:pk>/lists/<int:list_id>/cards/', views.add_new_card_to_list, name='add_new_card_to_list'),
    path('<int:pk>/lists/<int:list_id>/', views.list_detail, name='list_detail'),
]