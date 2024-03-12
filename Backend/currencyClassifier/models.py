from django.db import models

# Create your models here.

class User(models.Model):
  fName = models.CharField(max_length=300)
  lName = models.CharField(max_length=300)

  amount = models.CharField(default = "0" , blank=True)
  phoneNo = models.CharField(default = "0")
  
  username = models.CharField(max_length=300 , unique=True )
  password = models.CharField(max_length=100 , blank = False)

  email = models.EmailField(max_length = 254 , unique=True)

  date_joined = models.DateTimeField(auto_now_add=True)


  # def __str__(self):
  #   return self.body
  
