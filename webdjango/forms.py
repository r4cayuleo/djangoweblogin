from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import PerfilUsuario

class RegistroForm(UserCreationForm):
    nombre = forms.CharField(max_length=100, required=True, help_text='Requerido')
    apellido = forms.CharField(max_length=100, required=True, help_text='Requerido')
    correo = forms.EmailField(max_length=254, required=True, help_text='Requerido')
    sexo = forms.ChoiceField(choices=(('hombre', 'Hombre'), ('mujer', 'Mujer'), ('otro', 'Otro')), required=True, help_text='Requerido')
    edad = forms.IntegerField(required=True, help_text='Requerido')

    class Meta:
        model = User
        fields = ('username', 'nombre', 'apellido', 'correo', 'password1', 'password2', 'sexo', 'edad')

    def save(self, commit=True):
        user = super(RegistroForm, self).save(commit=False)
        user.email = self.cleaned_data['correo']
        if commit:
            user.save()
            perfil = PerfilUsuario(
                user=user,
                nombre=self.cleaned_data['nombre'],
                apellido=self.cleaned_data['apellido'],
                sexo=self.cleaned_data['sexo'],
                edad=self.cleaned_data['edad']
            )
            perfil.save()
        return user