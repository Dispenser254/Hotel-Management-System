from django.urls import path
from .views import RoomDetail, RoomList

urlpatterns = [
    path('rooms/', RoomList.as_view()),
    path('rooms/<int:pk>/', RoomDetail.as_view())
]
