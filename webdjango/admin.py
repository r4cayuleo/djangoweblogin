from django.contrib import admin
from .models import PerfilUsuario, Biografia

@admin.register(PerfilUsuario)
class PerfilUsuarioAdmin(admin.ModelAdmin):
    list_display = ('user', 'nombre', 'apellido', 'sexo', 'edad')
    search_fields = ('nombre', 'apellido', 'user__username')

@admin.register(Biografia)
class BiografiaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre', 'descripcion')
