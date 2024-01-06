from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomerSerializer
from django.http import Http404
from .models import Customer
# Create your views here.

class CustomerList(APIView):
    def get(self, request):
        customer = Customer.objects.all()
        customer_count = customer.count()
        serializer = CustomerSerializer(customer, many=True)
        
        response_data = {
            'customer': serializer.data,
            'customer_count': customer_count
        }
        return Response(response_data, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CustomerDetail(APIView):
    def get_object(self, pk):
        try:
            return Customer.objects.get(pk=pk)
        except Customer.DoesNotExist:
            return Http404
        
    def get(self, request, pk):
        customer = self.get_object(pk)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)
    
    def put(self, request, pk):
        customer = self.get_object(pk)
        serializer = CustomerSerializer(customer , data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, pk):
         customer = self.get_object(pk)
         customer.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)