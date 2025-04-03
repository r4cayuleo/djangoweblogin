from django.contrib import admin
from django.urls import path, include
<<<<<<< HEAD
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('webdjango.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
=======

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('webdjango.urls')),  # Incluir las URLs de la aplicación webdjango
]
>>>>>>> 4e772b9f58dcd6228b9abb5ec2fee1bc5080ece0
