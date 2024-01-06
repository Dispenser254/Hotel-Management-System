from django.urls import path
from .views import BookingDetail, BookingList, PaymentDetail, PaymentList

urlpatterns = [
    path('booking/', BookingList.as_view()),
    path('booking/<int:pk>/', BookingDetail.as_view()),
    path('payment/', PaymentList.as_view()),
    path('payment/<int:pk>/', PaymentDetail.as_view()),
]

