from django.contrib import admin
from .models import Room
# Register your models here.

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('room_number', 'room_type', 'bed_capacity', 'air_condition', 'rent', 'status', 'created_at')