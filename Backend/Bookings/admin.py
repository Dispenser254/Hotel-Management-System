from django.contrib import admin
from .models import Booking
# Register your models here.

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_number', 'room_number', 'check_in', 'check_out', 'payment', 'status', 'created_at')