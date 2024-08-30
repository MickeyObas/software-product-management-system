from django.urls import path

from . import views

urlpatterns = [
    path('', views.workspace_list, name='list_workspaces'),
    path('create', views.create_workspace, name='create_workspace'),
    path('<int:workspace_id>/boards/', views.board_list, name='list')
]