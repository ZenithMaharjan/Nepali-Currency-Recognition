from . import views 
from django.urls import path

urlpatterns = [
    path('', views.ApiOverview, name='home'),
    path('create/', views.add_user, name='add-items'),
    path('all/', views.view_items, name='view_items'),
    path('post/', views.test, name='test'),
    path('classifier/', views.classifier, name='classifier'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('update/', views.update, name='update'),
]