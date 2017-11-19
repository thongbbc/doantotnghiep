#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
const char* ssid = "BLACK";
const char* password = "yoursolution";
 const char* host = "doantotnghiep.herokuapp.com";

void setup () {
 
  Serial.begin(115200);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
 
    delay(1000);
    Serial.print("Connecting..");
 
  }
  Serial.println("Connected");
 
}

void loop() {
  if (Serial.available()){
    char request[255] = {};
    int i =0;
    while (Serial.available()){
      delay(10);
      request[i]= Serial.read();
      i = i +1;
    }
//    Serial.println(request);
    if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
     
        WiFiClient client;
        const int httpPort = 80;
        if (!client.connect(host, httpPort)) {
          Serial.println("connection failed");
          return;
        }
        Serial.println("CONNECT SUCCESS");
        //id=1&typeTrip=true
        String postData =request;
  
  
        client.println("POST /saveTRIP/ HTTP/1.1");
        client.println("Host: doantotnghiep.herokuapp.com");
        client.println("Cache-Control: no-cache");
        client.println("Content-Type: application/x-www-form-urlencoded");
        client.print("Content-Length: ");
        client.println(postData.length());
        client.println();
        client.println(postData);
  
        delay(10);
  
        // Read all the lines of the reply from server and print them to Serial
        long interval = 2000;
        unsigned long currentMillis = millis(), previousMillis = millis();
        
        while(!client.available()){
          if( (currentMillis - previousMillis) > interval ){
        
            Serial.println("Timeout");
            client.stop();     
            return;
          }
          currentMillis = millis();
        }
        
        while (client.connected())
        {
          if ( client.available() )
          {
            char str=client.read();
            Serial.print(str);
          }      
        }
     
    }
  }
}
