from django.urls import path
from accounts import views as UserViwes


urlpatterns =[
    path('register/',UserViwes.RegisterView.as_view(),name='register'),
]