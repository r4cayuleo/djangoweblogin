from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('eventos/', views.eventos, name='eventos'),
    path('artistas/', views.artistas, name='artistas'),
    path('biografias/', views.biografias, name='biografias'),
    path('contactanos/', views.contactanos, name='contactanos'),
    path('nosotros/', views.nosotros, name='nosotros'),
    path('registro/', views.registro, name='registro'),
    path('login/', views.login_view, name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('perfil/', views.perfil, name='perfil'), 
   path('datos_compra/', views.datos_compra, name='datos_compra'),
    # Agrega otras rutas necesarias
]
