from django.shortcuts import render
import requests
from django.http import JsonResponse
from rest_framework import generics
import json
import os
from django.conf import settings
from .skyapi import skyCoordinates

def Nightsky(request):
    
    
    def get_location_info(ip_address):
        
        url = f"https://ipinfo.io/{ip_address}/json"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception("Failed to get location information.")
            
    def get_public_ip():
        try:
            response = requests.get('https://api.ipify.org?format=json')
            if response.status_code == 200:
                return response.json()['ip']
            else:
                raise Exception("Unable to fetch public IP.")
        except Exception as e:
            print("Error:", e)
            return None

    # Get the public IP address
    public_ip = get_public_ip()


    # Get your public IP address (you can use the previous method to fetch it)
    # public_ip = "your_public_ip_address"

    # Request location information based on your public IP address
    location_info = get_location_info(public_ip)

    # Extract latitude and longitude from the location information
    latitude = location_info.get("loc", "").split(",")[0]
    longitude = location_info.get("loc", "").split(",")[1]

    planetData,moon_data,sun_data,time=skyCoordinates()
    print('the data is :',moon_data,sun_data)
    
    # print(planetData)
    
    
    data ={"Latitude":latitude,"Longitude": longitude, "PlanetData":planetData,"Sun":sun_data,"Time":time,"Moon":moon_data}
    # return JsonResponse(data)
    # data_json = json.dumps(data)
    return JsonResponse(data)
    # return render(request,  'nightsky.html')
    
################################


# Create your views here.
