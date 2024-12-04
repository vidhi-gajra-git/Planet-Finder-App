import requests
from skyfield.api import load, Topos
import math
import pandas as pd
from skyfield.api import N, S, E, W, wgs84
from datetime import timedelta
from pytz import timezone
# indian = timezone('GMT')
# API credentialsn

application_id = 'a279723c-31eb-4006-9fe7-6b62cc284731'
application_secret = '1e605eba5cdbeae18af7dc9d5538309389ab9e91903c75a20fc9dad8efc27c26439c71eda26c473b4fac259238f97c64cc3c515b5e0c1e90ee31a15a3f331427004d83809e9bc706078a8b3845bd87f44d705343409a258ab336d07c827b6ea502035a648555840ba884b1b0a9122674'

# Function to convert altitude and azimuth to Cartesian coordinates
def convert_altaz_to_xy(altitude, azimuth, radius):
    theta = math.radians(altitude.degrees)
    phi = math.radians(azimuth.degrees)
    x = radius * math.sin(theta) * math.cos(phi)
    y = radius * math.sin(theta) * math.sin(phi)
    return theta, phi

# Function to get location information from IP address
def get_location_info(ip_address):
    url = f"https://ipinfo.io/{ip_address}/json"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception("Failed to get location information.")

# Function to get public IP address
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

# Request location information based on the public IP address
location_info = get_location_info(public_ip)
latitude = location_info.get("loc", "").split(",")[0]
longitude = location_info.get("loc", "").split(",")[1]

# Function to convert altitude and azimuth to Cartesian coordinates
def convert_altaz_to_xy(altitude, azimuth, radius):
    theta = math.radians(altitude.degrees)
    phi = math.radians(azimuth.degrees)
    x = radius * math.sin(theta) * math.cos(phi)
    y = radius * math.sin(theta) * math.sin(phi)
    return theta, phi

# Function to calculate sky coordinates
def  skyCoordinates():
    eph = load('de421.bsp')
    planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
    observer_latitude = float(latitude)
    observer_longitude = float(longitude)
    observer_elevation = 215
    data = []
    moon_data=[]
    sun_data=[]
    sizes = {'mercury': 0.38, 'venus': .95, 'mars': .53, 'jupiter': 11.19, 'saturn': 9.40, 'uranus': 4.04, 'neptune': 3.88}
    ts = load.timescale()
    current_time = ts.now()
    timezone_offset_hours = float(longitude) / 15.0
    ts_with_offset = current_time + timezone_offset_hours -12
    print(ts_with_offset.utc_datetime())
    earth, celestial_object = eph['earth'], eph['moon'] 
    observer = Topos(latitude_degrees=observer_latitude, longitude_degrees=observer_longitude, elevation_m=observer_elevation)
    celestial_object_apparent = (earth + observer).at(ts_with_offset).observe(celestial_object).apparent()
    azimuth, altitude, distance = celestial_object_apparent.altaz()
    y, x = convert_altaz_to_xy(altitude, azimuth, (distance.au * 23450))
    moon_data.append({'body': 'moon', 'x': x, 'y': y})
    
    earth, celestial_object = eph['earth'], eph['sun']
    celestial_object_apparent = (earth + observer).at(ts_with_offset).observe(celestial_object).apparent()
    azimuth, altitude, distance = celestial_object_apparent.altaz()
    y, x = convert_altaz_to_xy(altitude, azimuth, (distance.au * 23450))
    sun_data.append({'body': 'sun', 'x': x, 'y': y})
    
    for planet in planets:
        
        
        earth, celestial_object = eph['earth'], eph[f'{planet} barycenter']
        observer = Topos(latitude_degrees=observer_latitude, longitude_degrees=observer_longitude, elevation_m=observer_elevation)
        celestial_object_apparent = (earth + observer).at(ts_with_offset).observe(celestial_object).apparent()
        azimuth, altitude, distance = celestial_object_apparent.altaz()
        y, x = convert_altaz_to_xy(altitude, azimuth, (distance.au * 23450))
        data.append({'planet': planet, 'x': x, 'y': y, 'z': distance.au * 23450})
    # print(data,(moon_data),(sun_data),current_time.utc_datetime())z
    return data,moon_data,sun_data,current_time.utc_datetime()


