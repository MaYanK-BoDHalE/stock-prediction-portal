from django.urls import path
from accounts import views as UserViwes
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import StockPredictionAPIView 


urlpatterns =[
    path('register/',UserViwes.RegisterView.as_view(),name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', UserViwes.ProtectedView.as_view(), name='protected'),
    path('predict/', StockPredictionAPIView.as_view(), name='predict'),
]