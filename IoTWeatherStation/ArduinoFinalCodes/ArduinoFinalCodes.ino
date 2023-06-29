#include <DHT.h>
#include <ESP8266WiFi.h>
#include <LiquidCrystal_I2C.h>

DHT dht(13, DHT11);

#define REDPIN 14
#define GREENPIN 16
#define BUZZER 12

const char* ssid = "RCA-WiFii";
const char* password = "@rca@2023";
//const char* host = "192.168.1.154";

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup()
{  
  Serial.begin(115200);
  Serial.println("DHT11 Temperature and Humidity Sensor");
  dht.begin();

  // LEDs
  pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  // LCD
  lcd.init();
  lcd.backlight(); 
  lcd.setCursor(0,0);   
  lcd.print("Welcome to IOT");
  lcd.setCursor(0,1);
  lcd.print("WEATHER STATION");
  
  // Connect to Wi-Fi
  connectToWifi(ssid, password);
}

void connectToWifi(String ssid, String password) {
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}


void loop()
{
  delay(2000);
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();  

  if (isnan(temperature) || isnan(humidity))
  {
    Serial.println("Failed to read data from DHT sensor");
  }
  else
  {
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" °C");
    Serial.println("");
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.print(" %");
    
   lcd.clear();
   lcd.setCursor(0,0);
   lcd.print("Temperature:");
   lcd.print(temperature);
   lcd.print(char(223));
   lcd.print("C");
   lcd.setCursor(0,1);
   lcd.print("Humidity: ");
   lcd.print(humidity);
   lcd.print("%");
  }
  
  if (temperature >= 27){
    digitalWrite(REDPIN, HIGH);
    digitalWrite(BUZZER, HIGH);
    digitalWrite(GREENPIN, LOW);
    beepBuzzer(10, 100); // Beep the buzzer 10 times with 100ms interval
   }
   else {
    digitalWrite(REDPIN, LOW);
    digitalWrite(BUZZER, LOW);
    digitalWrite(GREENPIN, HIGH);
   }
    Serial.println("\nAbout to send data ............");
   String tempData="";
   String indexNumber = "340722SPE05920";
   tempData = "{\"device\":\"" + (String) indexNumber + "\",\"temperature\": " + (String) temperature + ", \"humidity\": " + (String) humidity + "}";
   Serial.println("Data sent: ");
   Serial.println(tempData);
   connectToWifi(ssid, password);
   uploadData("192.168.1.150",80, "/weather-station/backend.php" , tempData);
   delay(1000);
}

void beepBuzzer(int repetitions, int interval) {
  for (int i = 0; i < repetitions; i++) {
    digitalWrite(BUZZER, HIGH);
    delay(interval);
    digitalWrite(BUZZER, LOW);
    delay(interval);
  }
}

void uploadData(const char* host, const int httpPort, const char* filepath, const String& data) {
  WiFiClient wifiClient;
  
  if (wifiClient.connect(host, httpPort)) {
    wifiClient.print("POST ");
    wifiClient.print(filepath);
    wifiClient.println(" HTTP/1.1");
    wifiClient.print("Host: ");
    wifiClient.println(host);
    wifiClient.println("User-Agent: ESP8266/1.0");
    wifiClient.println("Content-Type: application/json");
    wifiClient.print("Content-Length: ");
    wifiClient.println(data.length());
    wifiClient.println();
    wifiClient.println(data);
  
    Serial.println("Request sent");
  } else {
    Serial.println("Failed to connect to server");
  }
  
  while (wifiClient.connected() && !wifiClient.available()) {
    delay(1); // Wait for response
  }
  
  if (wifiClient.available()) {
    String response = wifiClient.readStringUntil('\n');
    Serial.println("Response: " + response);
  }
  
  wifiClient.stop();
}
