from django.urls import path

from . import views

urlpatterns = [
    path('', views.workspace_list, name='list_workspaces'),
    path('<int:pk>/', views.workspace_detail, name='workspace_detail'),
    path('create', views.create_workspace, name='create_workspace'),
    path('<int:workspace_id>/boards/', views.board_list, name='board_list'),
    path('<int:pk>/add-member/', views.add_member, name='add-member')
]