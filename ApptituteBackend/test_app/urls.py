from django.contrib import admin
from django.urls import path
from . import views 

urlpatterns = [
    path('create_user' , views.create_user_view , name='create_user'),
    path('get_question/<int:id>' , views.get_single_question_view , name='get_single_question'),
    path('submit_answer' , views.submit_answer , name='submit_answer'),
    path('get_all_question' , views.get_all_question , name='get_all_question')

]