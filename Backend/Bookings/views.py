from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import BookingSerializer, PaymentMethodSerializer
from django.http import Http404
from .models import Booking, PaymentMethod
from Rooms.models import Room

# Create your views here.
class BookingList(APIView):
    def get(self, request):
        bookings = Booking.objects.all().order_by('-created_at')
        bookings_count = bookings.count()
        serializer = BookingSerializer(bookings, many=True)
        
        response_data = {
            'bookings': serializer.data,
            'bookings_count': bookings_count
        }
        return Response(response_data, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            booking = serializer.save()
            room_number = booking.room_number
            try:
                room = Room.objects.get(room_number=room_number)
                if Booking.objects.filter(id_number=booking.id_number, room_number=room_number).exclude(id=booking.id).exists():
                    raise Http404('User is already booked in this room.')
                room.status = 'Booked'
                room.save()
            except Room.DoesNotExist:
                raise Http404('Room does not exist.')
                
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BookingDetail(APIView):
    def get_object(self, pk):
        try:
            return Booking.objects.get(pk=pk)
        except Booking.DoesNotExist:
            return Http404
        
    def get(self, request, pk):
        booking = self.get_object(pk)
        serializer = BookingSerializer(booking)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        booking_to_update = Booking.objects.get(id=pk)
        serializer = BookingSerializer(instance=booking_to_update , data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk=None):
        booking_to_delete = Booking.objects.get(id=pk)
        room_number = booking_to_delete.room_number
        booking_to_delete.delete()
        try:
            room = Room.objects.get(room_number=room_number)
            room.status = 'Open'
            room.save()
        except Room.DoesNotExist:
            raise Http404('Room does not exist.')
        
        return Response(status=status.HTTP_204_NO_CONTENT)
     
class PaymentList(APIView):
    def get(self):
        payments = Room.objects.all()
        serializer = PaymentMethod(payments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = PaymentMethodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
class PaymentDetail(APIView):
    def get_object(self, pk):
        try:
            return PaymentMethod.objects.get(pk=pk)
        except PaymentMethod.DoesNotExist:
            return Http404
        
    def get(self, pk):
        payment = self.get_object(pk)
        serializer = PaymentMethodSerializer(payment)
        return Response(serializer.data)
    
    def put(self, request, pk):
        payment = self.get_object(pk)
        serializer = PaymentMethodSerializer(payment , data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, pk):
         payment = self.get_object(pk)
         payment.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)