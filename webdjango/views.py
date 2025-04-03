from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .models import Biografia
from .forms import RegistroForm, BiografiaForm

# INICIO: se muestran las biografías destacadas
def inicio(request):
    biografias = Biografia.objects.all()
    return render(request, 'webdjango/inicio.html', {'biografias': biografias})

@login_required
def eventos(request):
    return render(request, 'webdjango/eventos.html')

def artistas(request):
    return render(request, 'webdjango/artistas.html')

# VISTA CON FILTROS DE BUSQUEDA
def biografias(request):
    query = request.GET.get('q')
    genero = request.GET.get('genero')

    biografias = Biografia.objects.all()

    if query:
        biografias = biografias.filter(nombre__icontains=query)

    if genero:
        biografias = biografias.filter(descripcion__icontains=genero)

    return render(request, 'webdjango/biografias.html', {
        'biografias': biografias,
        'query': query,
        'genero': genero,
    })

def contactanos(request):
    return render(request, 'webdjango/contactanos.html')

def nosotros(request):
    return render(request, 'webdjango/nosotros.html')

def registro(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('inicio')
    else:
        form = RegistroForm()
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

# PANEL ADMIN: LISTAR, AGREGAR, EDITAR Y ELIMINAR
@login_required
def listar_biografias(request):
    biografias = Biografia.objects.all()
    return render(request, 'webdjango/listar_biografias.html', {'biografias': biografias})

@login_required
def agregar_biografia(request):
    if request.method == 'POST':
        form = BiografiaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('listar_biografias')
    else:
        form = BiografiaForm()
    return render(request, 'webdjango/form_biografia.html', {
        'form': form,
        'titulo': 'Agregar Biografía'
    })

@login_required
def editar_biografia(request, pk):
    biografia = get_object_or_404(Biografia, pk=pk)
    
    if request.method == 'POST':
        form = BiografiaForm(request.POST, request.FILES, instance=biografia)

        # Si marcaron "eliminar imagen", borramos el archivo
        if request.POST.get('eliminar_imagen') and biografia.imagen:
            biografia.imagen.delete(save=False)
            biografia.imagen = None

        if form.is_valid():
            form.save()
            return redirect('listar_biografias')
    else:
        form = BiografiaForm(instance=biografia)
    
    return render(request, 'webdjango/form_biografia.html', {'form': form, 'titulo': 'Editar Biografía'})


@login_required
def eliminar_biografia(request, pk):
    biografia = get_object_or_404(Biografia, pk=pk)
    biografia.delete()
    return redirect('listar_biografias')
