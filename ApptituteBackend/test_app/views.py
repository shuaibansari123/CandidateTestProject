import json
from json import JSONDecodeError
from aiohttp import content_disposition_filename
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserCandidate , Question, Answer


@csrf_exempt
def create_user_view(request):
    if request.method == 'POST':
        try:
            # Parse JSON payload
            data = json.loads(request.body)

            print(request.POST, type(request.POST) , request.POST.get('name') , '  REQUEST.POST ------create user view------')
            print(data , '----data')

            name = data.get('name')
            email = data.get('email')
            phone = data.get('phone') 
            ctc = data.get('ctc')
            role = data.get('role')

            instance = UserCandidate.objects.filter( email=email )
            if instance:
                return JsonResponse({'status':'failed' , 'message':'email already exist' , 'data':   
                                        { 'Id':instance.id , 'name':instance.name,
                                        'phone': instance.phone , 'email':instance.email,
                                        'role':instance.role , 'CTC': instance.ctc 
                                        }
                                })
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
            # Parse JSON payload
            data = json.loads(request.body)
            user_selected_answer = data.get('user_selected_answer')
            question = get_object_or_404( Question , quest_id=int(data.get('question_id')))
            candidate = get_object_or_404( UserCandidate , id=int(data.get('candidate_id')))

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
        # condition for formatted question like code
        question_text = question_instance.question_text
        if not question_instance.question_text or question_text == 'None' or question_text.strip() == '':
            question_text = question_instance.question_formatted_text
        
        return JsonResponse({'status':'success' , 'data' : 
                                    { 'id': question_instance.quest_id, 'question_text' : question_text,
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


@csrf_exempt
def list_all_attended_attend(request):
    '''
    List all user who has submitted the answers.
    '''
    all_user_attended_question =  UserCandidate.objects.filter(questions__isnull=False).distinct().values('id' , 'email' , 'name' , 'ctc' ,'phone' )
    context_data = {'all_users':all_user_attended_question}
    return render(request , 'results.html' , context_data)

def user_answers_result_view(request, user_id):
    user = get_object_or_404(UserCandidate, id=user_id)
    
    # Fetch all answers for this user
    answers = Answer.objects.filter(candidate=user).select_related('question')  
    
    total_attended_answers = answers.count()
    total_correct_answers = sum(1 for answer in answers if answer.question.correct_answer == answer.user_selected_answer)

    return render(request, 'user_result.html', {
        'user': user,
        'answers': answers,
        'total_attended_answers': total_attended_answers,
        'total_correct_answers': total_correct_answers
    })