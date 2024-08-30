from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.api_root, name='api_root'),
    path('students/', views.student_list, name='student_list'),
    path('students/<int:pk>', views.student_detail, name='student_detail'),
    path('items/', views.ItemList.as_view(), name='item_list'),
    path('items/<int:pk>', views.ItemDetail.as_view(), name='item_detail'),
    path('users/', views.UserList.as_view(), name='user_list'),
    path('users/<int:pk>', views.UserDetail.as_view(), name='user_detail'),
    path('register/', views.user_register, name='user_register'),
    # More Routes
    path('workspaces/', include('workspaces.urls')),
    path('products/', include('products.urls'))
]