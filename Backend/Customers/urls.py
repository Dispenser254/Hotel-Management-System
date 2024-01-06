from django.urls import path
from .views import CustomerDetail, CustomerList

urlpatterns = [
    path('customer/', CustomerList.as_view()),
    path('customer/<int:pk>/', CustomerDetail.as_view())
]
