from json import JSONDecodeError
from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import UserCandidate , Question, Answer
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def create_user_view(request):
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            email = request.POST.get('email')
            phone = request.POST.get('phone') 
            ctc = request.POST.get('ctc')
            role = request.POST.get('role')
            instance = UserCandidate(name=name , email=email , phone=phone, ctc=ctc , role=role)
            instance.save()
            return JsonResponse({'status':'success' , 'message':'user created' , 'data':   
                                        { 'Id':instance.id , 'name':instance.name,
                                        'phone': instance.phone , 'email':instance.email,
                                        'role':instance.role , 'CTC': instance.ctc 
                                        }
                                })
        except Exception as err:
            return JsonResponse({'status':'failed' , 'error':str(err)}, safe=False)
    return JsonResponse({'status':'failed' , 'error':'GET request not allowed'} , safe=False)

@csrf_exempt
def submit_answer(request):
    if request.method == 'POST':
        try:
            user_selected_answer = request.POST.get('user_selected_answer')
            question = get_object_or_404( Question , quest_id=int(request.POST.get('question_id')))
            candidate = get_object_or_404( UserCandidate , id=int(request.POST.get('candidate_id')))

            answer_instance = Answer(candidate=candidate , question = question,
                                    user_selected_answer=user_selected_answer)
            answer_instance.save()
            return JsonResponse({'status':'success' , 'message': 'answer submitted'
                                })
        except Exception as err:
            return JsonResponse({'status':'failed' , 'error':str(err)}, safe=False)
    return JsonResponse({'status':'failed' , 'message':'GET request not allowed'} , safe=False)

@csrf_exempt
def get_single_question_view(request , id):
    if  id:
        question_instance = Question.objects.get(quest_id=id)
        return JsonResponse({'status':'success' , 'data' : 
                                    { 'id': question_instance.quest_id, 'question_text' : question_instance.question_text,
                                    'A':question_instance.A , 'B':question_instance.B , 'C':question_instance.C,
                                    'D':question_instance.D
                                    }
                            }, safe=False)
    return JsonResponse({'status':'failed' , 'message':'id is required'} , safe=False)

@csrf_exempt
def get_all_question(request):
    all_question = Question.objects.all()
    data=[]
    for question in all_question:
        data.append(   { 'id': question.quest_id, 'question_text' : question.question_text,
                                    'A':question.A , 'B':question.B , 'C':question.C,
                                    'D':question.D
                                    })
    return JsonResponse({'status':'success' , 'message': 'all questions retrieved' , 'data':data
                                })