from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('eventos/', views.eventos, name='eventos'),
    path('artistas/', views.artistas, name='artistas'),
    path('biografias/', views.biografias, name='biografias'),
    path('biografias/panel/', views.listar_biografias, name='listar_biografias'),
    path('biografias/agregar/', views.agregar_biografia, name='agregar_biografia'),
    path('biografias/editar/<int:pk>/', views.editar_biografia, name='editar_biografia'),
    path('biografias/eliminar/<int:pk>/', views.eliminar_biografia, name='eliminar_biografia'),
    path('contactanos/', views.contactanos, name='contactanos'),
    path('nosotros/', views.nosotros, name='nosotros'),
    path('registro/', views.registro, name='registro'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('perfil/', views.perfil, name='perfil'),
    path('datos_compra/', views.datos_compra, name='datos_compra'),
]
