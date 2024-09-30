from django.test import TestCase

# Create your tests here.
from .models import Question

def create_test_questions(number_of_question:int=20):
    try:
        for num in range(1 , number_of_question+1):
            Question.objects.create(quest_id=num , question_text=f'Test Question {num}', A='A', B='B', C='C', D='D' )
        return f'SUCESSFULLY {number_of_question} CREATED'
    except Exception as e:
        return f'ERROR = {str(e)}'