from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RoomSerializer
from django.http import Http404
from .models import Room
# Create your views here.

class RoomList(APIView):
    def get(self, request):
        rooms = Room.objects.all().order_by('-created_at')
        room_count = rooms.count()
        serializer = RoomSerializer(rooms, many=True)
        
        response_data = {
            'rooms': serializer.data,
            'rooms_count': room_count
        }
        return Response(response_data, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class RoomDetail(APIView):
    def get_object(self, pk):
        try:
            return Room.objects.get(pk=pk)
        except Room.DoesNotExist:
            return Http404
        
    def get(self, request, pk):
        room = self.get_object(pk)
        serializer = RoomSerializer(room)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        room_to_update = Room.objects.get(id=pk)
        serializer = RoomSerializer(instance=room_to_update , data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk=None):
         room_to_delete = Room.objects.get(id=pk)
         room_to_delete.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)