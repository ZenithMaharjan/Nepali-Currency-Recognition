from django.shortcuts import render
from rest_framework import viewsets , status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .serializers import UserSerializer
from . import serializers
from . import models
from werkzeug.utils import secure_filename
from .modules import Classifier
from .modules import FeatureExtraction
import os
import json
# Create your views here.

    
@api_view(['POST'])
def classifier(request):
    print('Enter Classification')
    if (request.FILES['image']): 
        file = request.FILES['image']

        # result = classify.model_predict(file)
        cur = FeatureExtraction.checkCurrency(file)
        if (cur == "FAKE"):
            result = Classifier.imagepredict(file)
        else:
            cur = result
            
        serialized_data = json.dumps(result)
        # return result
    # result = classify.hi()
    # print(result)
    return Response({'data': serialized_data})

@api_view(['POST'])
def register(request):
    item = serializers.UserSerializer(data=request.data)
    print(item)   
    
    if item.is_valid():
        item.save()
        return Response(item.data)
    else:
        print('error')
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def login(request):
    if models.User.objects.filter(username = request.data['username']).exists():
        items = models.User.objects.filter(username = request.data['username']).values()
        if request.data['password'] == items[0]['password']:
            return Response(items[0])
        else:
            return Response("Password Don't Match")
    else:
        return Response("Login Failed")
    
@api_view(['POST'])
def update(request):
        items = models.User.objects.filter(username = request.data['username']).values()
        items[0]['amount'] = request.data['amount'] + items[0]['amount']
        item = serializers.UserSerializer(data=items)
        if item.is_valid():
            item.save()
            return Response(item.data)
        else:
            print('error')
            return Response(status=status.HTTP_404_NOT_FOUND)
        
# class UserViewset(viewsets.ModelViewSet):
#   queryset = models.User.objects.all()
#   serializer_class = serializers.UserSerializer

@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'all_items': '/',
        'Search by Category': '/?category=category_name',
        'Search by Subcategory': '/?subcategory=category_name',
        'Add': '/create',
        'Update': '/update/pk',
        'Delete': '/item/pk/delete'
    }
 
    return Response(api_urls)

@api_view(['POST'])
def add_user(request):
    item = serializers.UserSerializer(data=request.data)
    print(item)

    # validating for already existing data
    if models.User.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
 
    if item.is_valid():
        item.save()
        return Response(item.data)
    else:
        print('error')
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def view_items(request):
    
  # checking for the parameters from the URL
  if request.query_params:
      items = models.User.objects.filter(**request.query_params.dict())
  else:
      items = models.User.objects.all()

  # if there is something in items else raise error
  if items:
      serializer = serializers.UserSerializer(items, many=True)
      return Response(serializer.data)
  else:
      return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def test(request):
    print(request.data)
    return Response(request.data)