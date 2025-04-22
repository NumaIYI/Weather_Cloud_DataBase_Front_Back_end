from flask import Flask, jsonify, request  
from dotenv import load_dotenv  
from flask_cors import CORS
import os  
import requests  
from pymongo import MongoClient
from datetime import datetime

load_dotenv()  
app = Flask(__name__)  
CORS(app)

# MongoDB bağlantısı ve koleksiyon kontrolü
try:
    client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=5000)
    client.admin.command('ping')  # Daha güvenli bağlantı testi
    db = client["WeatherDB"]
    weather_collection = db["weather_history"]
    print("✓ MongoDB bağlantısı başarılı")
except Exception as e:
    print(f"⛔ MongoDB hatası: {e}")
    weather_collection = None  # Bağlantı yoksa None olarak işaretle

@app.route('/weather', methods=['GET'])  
def get_weather():  
    try:
        city = request.args.get('city')
        if not city:
            return jsonify({"error": "Şehir parametresi gereklidir"}), 400
            
        api_key = os.getenv("OPENWEATHER_API_KEY")
        if not api_key:
            raise ValueError("OpenWeather API key bulunamadı")
        
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric&lang=tr"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        weather_data = response.json()
        
        # DÜZELTME: weather_collection'ı doğru şekilde kontrol et
        if weather_collection is not None:  # None karşılaştırması yap
            record = {
                "city": city.lower(),
                "data": weather_data,
                "timestamp": datetime.now()
            }
            weather_collection.insert_one(record)
        
        return jsonify(weather_data)
        
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"OpenWeather API hatası: {str(e)}"}), 502
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)