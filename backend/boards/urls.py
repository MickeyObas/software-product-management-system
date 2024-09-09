from django.urls import path

from . import views 


urlpatterns = [
    path('<int:pk>/lists/', views.lists_for_board, name='lists_for_board'),
    path('<int:pk>/update-recently-viewed/', views.update_recently_viewed, name='update-recently-viewed'),
    path('recently-viewed/', views.get_recently_viewed_boards, name='get-recently-viewed-boards'),
    path('favorite-boards/', views.get_favorite_boards, name='get-favorite-boards'),
    path('<int:pk>/is-favorite/', views.is_favorite_board, name='is-favorite-board'),
    path('toggle-favorite/', views.toggle_favorite_board, name='toggle-favorite-board'),
    path('<int:pk>/lists/<int:list_id>/cards/', views.add_new_card_to_list, name='add_new_card_to_list'),
    path('<int:pk>/lists/<int:list_id>/', views.list_detail, name='list_detail'),
]