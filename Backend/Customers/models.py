from django.db import models

# Create your models here.
class Customer(models.Model):
    GENDER = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other')
    ]
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    gender = models.CharField(max_length=50, choices=GENDER)
    id_number = models.CharField(max_length=10)
    email = models.EmailField(max_length=254)
    address = models.CharField(max_length=250)
    phone_number = models.CharField(max_length=50)
    

    class Meta:
        verbose_name = "Customer"
        verbose_name_plural = "Customers"

    def __str__(self):
        return self.id_number
