from django.urls import path

from . import views

urlpatterns = [
    path('', views.activity_feed_list, name='activity-feed-list')
]