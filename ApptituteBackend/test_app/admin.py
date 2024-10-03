from django.contrib import admin
from .models import UserCandidate, Question , Answer
from django.contrib import admin
from .models import Question
from ckeditor.widgets import CKEditorWidget
from django import forms

class QuestionAdminForm(forms.ModelForm):
    question_text = forms.CharField(widget=CKEditorWidget())

    class Meta:
        model = Question
        fields = '__all__'

class QuestionAdmin(admin.ModelAdmin):
    form = QuestionAdminForm

admin.site.register(Answer)
admin.site.register(UserCandidate)
admin.site.register(Question)