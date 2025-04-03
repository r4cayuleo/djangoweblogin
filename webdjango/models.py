from django.contrib.auth.models import User  # Modelo de usuario de Django
from django.db import models  # Base para los modelos

# Perfil extendido del usuario
class PerfilUsuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    sexo = models.CharField(max_length=10, choices=(
        ('hombre', 'Hombre'),
        ('mujer', 'Mujer'),
        ('otro', 'Otro')
    ))
    edad = models.IntegerField()

    def __str__(self):
        return self.user.username

# Modelo de Biografía para artistas
class Biografia(models.Model):
    nombre = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='biografias/', blank=True, null=True)
    descripcion = models.TextField()
    discografia = models.TextField(blank=True, null=True)
    premios = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre
