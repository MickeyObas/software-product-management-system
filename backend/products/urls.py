from django.urls import path

from . import views

urlpatterns =[
    path('', views.product_list, name='list_product'),
    path('create', views.create_product, name='create_product'),
    path()
]