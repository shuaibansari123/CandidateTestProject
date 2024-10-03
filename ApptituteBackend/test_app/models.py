from pyexpat import model
from django.db import models
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField

class UserCandidate(models.Model):
    name = models.CharField(_("Name"), max_length=255 )
    email = models.CharField(_("Email"), max_length=255 , unique=True)
    phone = models.CharField(_("Phone Number"), max_length=255 , unique=True)
    ctc = models.CharField(_("CTC"), max_length=255)
    role = models.CharField(_("Role"), max_length=255) 

    # add additional fields in here

    def __str__(self):
        return self.name

class Question(models.Model):
    QUESTION_CHOICES = (
            ('A' , 'A'),
            ('B' , 'B'),
            ('C' , 'C'),
            ('D' , 'D')
                )
    quest_id = models.IntegerField(_("Question Id") , null=True , blank=True, unique=True)
    # for storing formatted question like code
    question_formatted_text = RichTextField(_('Question Formatted Text') , null=True , blank=True,)
    question_text = models.CharField(_('Question'), max_length=1000)
    A = models.CharField(_('Option A'), max_length=1000 , null=True , blank=True)
    B = models.CharField(_('Option B'), max_length=1000 , null=True , blank=True)
    C = models.CharField(_('Option C'), max_length=1000 , null=True , blank=True)
    D = models.CharField(_('Option D'), max_length=1000 , null=True , blank=True)

    correct_answer =  models.CharField(choices=QUESTION_CHOICES , max_length=255, blank=True, null=True)

class Answer(models.Model):
    ANSWER_CHOICES = (
            ('A' , 'A'),
            ('B' , 'B'),
            ('C' , 'C'),
            ('D' , 'D')
                )
    candidate = models.ForeignKey('UserCandidate', related_name='questions', on_delete=models.CASCADE , blank=True , null=True)
    question = models.ForeignKey('Question' , related_name='answers', on_delete=models.CASCADE , blank=True , null=True)
    user_selected_answer =  models.CharField(choices=ANSWER_CHOICES, max_length=255, blank=True, null=True)
    
    class Meta:
        unique_together = ('candidate', 'question')  # Ensure one answer per user per question
        verbose_name = "Answer"
        verbose_name_plural = "Answers"

    
