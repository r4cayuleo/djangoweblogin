from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.urls import reverse
from django.contrib.auth.decorators import login_required


def inicio(request):
    return render(request, 'webdjango/inicio.html')

@login_required
def eventos(request):
    return render(request, 'webdjango/eventos.html')

def artistas(request):
    return render(request, 'webdjango/artistas.html')

def biografias(request):
    return render(request, 'webdjango/biografias.html')

def contactanos(request):
    return render(request, 'webdjango/contactanos.html')

def nosotros(request):
    return render(request, 'webdjango/nosotros.html')


def registro(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('inicio')
    else:
        form = UserCreationForm()
    return render(request, 'registration/registro.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('inicio')
    else:
        form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})

@login_required
def perfil(request):
    return render(request, 'webdjango/perfil.html')

def logout_view(request):
    if request.method in ['POST', 'GET']:
        logout(request)
        return redirect('login') 
    
def datos_compra(request):
    return render(request, 'webdjango/datos_compra.html')

