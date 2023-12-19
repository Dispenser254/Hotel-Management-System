from django.db import models
from Rooms.models import Room
from Customers.models import Customer

# Create your models here.
class Booking(models.Model):
    PAYMENT = [
        ('Paid', 'Paid'),
        ('Pending', 'Pending')
    ]
    
    STATUS = [
        ('Inside', 'Inside'),
        ('Checked', 'Checked')
    ]
    
    id_number = models.ForeignKey(Customer, on_delete=models.CASCADE)
    room_number = models.ForeignKey(Room, on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()
    payment = models.CharField(max_length=100, choices=PAYMENT)
    status = models.CharField(max_length=100, choices=STATUS)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Booking"
        verbose_name_plural = "Bookings"

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class PaymentMethod(models.Model):
    payment_name = models.CharField(max_length=250)
    email = models.EmailField(max_length=254)
    current_setting = models.CharField(max_length=250)
    status = models.CharField(max_length=250)

    def __str__(self):
        return self.payment_name
