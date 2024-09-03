from django.urls import path

from . import views 


urlpatterns = [
    path('<int:pk>/lists/', views.lists_for_board, name='lists_for_board')
]