from django.db import models
from django.contrib.auth.hashers import check_password 

# Create your models here.
class UserAccount(models.Model):
    email = models.EmailField(max_length=225, unique=True)
    password = models.CharField(max_length=225)

    def __str__(self):
        return self.email
    
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)