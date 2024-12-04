from django.urls import path, include #new
from .views import Nightsky
from django.conf import settings

from django.conf.urls.static import static

urlpatterns = [
   
    path('nightsky', Nightsky) #new
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)