from django.db import models

# Create your models here.
class Room(models.Model):
    ROOM_TYPE = [
        ('Deluxe', 'Deluxe'),
        ('Super Deluxe', 'Super Deluxe'),
        ('Single', 'Single'),
        ('Double', 'Double'),
    ]
    
    STATUS = [
        ('Booked', 'Booked'),
        ('Open', 'Open'),
        ('Inactive', 'Inactive'),
    ]

    BED_CAPACITY = [
        ('One', 'Two'),
        ('Two', 'Two'),
        ('Three', 'Three'),
        ('Four', 'Four'),
        ('Five', 'Five'),
        ('Six', 'Six'),
        ('Seven', 'Seven'),
        ('Eight', 'Eight'),
        ('Nine', 'Nine')
    ]
    
    AIR_CONDITION = [
        ('AC', 'AC'),
        ('No AC', 'No AC'),
    ]
    
    room_number = models.CharField(max_length=50)
    room_type = models.CharField(max_length=50, choices=ROOM_TYPE)
    bed_capacity = models.CharField(max_length=50, choices=BED_CAPACITY)
    air_condition = models.CharField(max_length=50, choices=AIR_CONDITION)
    rent = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, default='Open', choices=STATUS)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.room_number
