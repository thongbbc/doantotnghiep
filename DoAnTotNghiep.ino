#include <Adafruit_Fingerprint.h>
#include <Wire.h>;
#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C.h>;

//Bien tro 1: A4 Bien Tro 2: A5
//Nut enter : 2 Nut Back: 3
//

uint8_t getFingerprintEnroll();
uint16_t id;
LiquidCrystal_I2C lcd(0x3F,16,2);
//SoftwareSerial Serial1(2, 3);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial1);

boolean a = true;
boolean b = true;
boolean c = true;
boolean d = true;
#define ENTER   2
#define BACK    3
int stateENTER=1;
int lastENTER =1; 
int stateBACK=1;
int lastBACK =1;

int voltage;
int voltage2;

boolean flagMenu1 = true;
boolean flagMenu2 = false;



const int trig = 10;     // chân trig của HC-SR04
const int echo = 9;     // chân echo của HC-SR04


int button = 7;
int buttonsearch = 8;
int led = 5;
bool flagClickButton = false;
bool flagTemp = false;

int statusNow = LOW;
int statusPre = LOW;



void setup(){
  Serial.begin(9600);  //Mở cổng Serial để giap tiếp | tham khảo Serial
  pinMode(ENTER, INPUT_PULLUP);
  pinMode(BACK, INPUT_PULLUP);
  pinMode(trig,OUTPUT);   // chân trig sẽ phát tín hiệu
  pinMode(echo,INPUT);    // chân echo sẽ nhận tín hiệu
  //LCD
  lcd.init();       //Khởi động màn hình. Bắt đầu cho phép Arduino sử dụng màn hình
  lcd.backlight();   //Bật đèn nền
  lcd.display();
  id =99;
  lcd.setCursor(0, 0);
    
    //Check cam bien van tay
    
  //  finger.begin(57600);
  //
  //  if (finger.verifyPassword()) {
  //    lcd.print("Found sensor!");
  //    delay (1000);
  //    deleteFingerprint(id);
  //  } else {
  //    lcd.print("No sensor found! ");
  //    delay(1000);
  //    while (1);
  //  }
  
  pinMode(button, INPUT);  //Cài đặt chân D11 ở trạng thái đọc dữ liệu
  pinMode(led,OUTPUT); // Cài đặt chân D2 dưới dạng OUTPUT
  pinMode(buttonsearch,INPUT_PULLUP);
  delay(2000);
}
void loop()
{
  //read button ENTER
  stateENTER = digitalRead(ENTER);
  //read button BACK  
  stateBACK = digitalRead(BACK);
  
  //Doc Cam Bien Menu
  int value = analogRead(A5);
  int value2 = analogRead(A4);
  menu(value,value2);
  
  unsigned long duration; // biến đo thời gian
  int distance;           // biến lưu khoảng cách
    
  /* Phát xung từ chân trig */
  digitalWrite(trig,0);   // tắt chân trig
  delayMicroseconds(2);
  digitalWrite(trig,1);   // phát xung từ chân trig
  delayMicroseconds(5);   // xung có độ dài 5 microSeconds
  digitalWrite(trig,0);   // tắt chân trig
  
  /* Tính toán thời gian */
  // Đo độ rộng xung HIGH ở chân echo. 
  duration = pulseIn(echo,HIGH);  
  // Tính khoảng cách đến vật.
  distance = int(duration/2/29.412);
  if (distance <=10) {
    lcd.clear();
    lcd.setCursor(0, 1);
    lcd.print("Waiting for ");
    lcd.setCursor(0, 1);
    lcd.print("finger..");
    delay(2000);
    if (getFingerprintIDez() != -1)
    {
      Serial.println("ID DUng");
      delay(9000);
    } else {
      Serial.println("ID ERROR");
    }
  }
  /* In kết quả ra Serial Monitor */
  //Serial.print(distance);
  //Serial.println("cm");
  delay(200);










  
  
//  int statusNow = digitalRead(buttonsearch);
//  if ((statusNow != statusPre) && statusNow == LOW){
//
//       digitalWrite(led,HIGH); // Đèn led sáng
//
//    statusPre = statusNow;
//
// lcd.clear();
//      lcd.setCursor(0, 1);
//        lcd.print("Waiting for ");
//        lcd.setCursor(0, 1);
//        lcd.print("finger..");
//        delay(2000);
//        if (getFingerprintIDez() != -1)
//        {
//            Serial.println("ID DUng");
//          delay(9000);
//        } else {
//                Serial.println("ID ERROR");
//          }
//
//    
//    } else {
//               digitalWrite(led,LOW); // Đèn led tat
//    statusPre = statusNow;
//
//      }
//
//  
//  lcd.setCursor(0,1);
//    int buttonStatus = digitalRead(button);    //Đọc trạng thái button
//  if (buttonStatus == HIGH) { // Nếu mà button bị nhấn
//    flagClickButton = true;
//   
//  } else { // ngược lại
//        flagClickButton = false;
//  }
//
//  if (flagClickButton == !flagTemp) {
//    lcd.clear();
//  if (flagClickButton) {
//       digitalWrite(led,HIGH); // Đèn led sáng
//     lcd.setCursor(0, 1);
//        lcd.print("Enrolling ID #");
//        lcd.print(id);
//        lcd.print("...");
//        delay(1000);
//        flagTemp = flagClickButton;
//     getFingerprintEnroll();
//
//
//   
//    flagTemp = flagClickButton;
//
//
//    
//  } else {
//        digitalWrite(led,LOW);
//
//
//
//        
//    flagTemp = flagClickButton;
//    }
// }
}



//////////////////////////////////////////////////////////////////////////////////////
uint8_t getFingerprintEnroll() {
  int p = -1;
  lcd.clear(); lcd.setCursor(0, 0);
  lcd.print("Wating for "); lcd.setCursor(2, 1);
  lcd.print("finger ID #");
  lcd.print(id);
  delay(1500);
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        lcd.clear(); lcd.setCursor(1, 0);
        lcd.print("Image taken");
        delay(1000);
        break;
      case FINGERPRINT_NOFINGER:
        lcd.clear(); lcd.setCursor(0, 0);
        lcd.print(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        lcd.clear(); lcd.setCursor(0, 0);
        lcd.print("Communication ");
        lcd.setCursor(0, 1);
        lcd.print("error");
        break;
      case FINGERPRINT_IMAGEFAIL:
        lcd.clear(); lcd.setCursor(3, 0);
        lcd.print("Imaging error");
        break;
      default:
        lcd.clear(); lcd.setCursor(3, 0);
        lcd.print("Unknown error");
        break;
    }
  }
  //  digitalWrite(buzzer,HIGH);delay(500);digitalWrite(buzzer,LOW);
  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      lcd.clear(); lcd.setCursor(0, 0);
      lcd.print("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      lcd.clear(); lcd.setCursor(0, 0);
      lcd.print("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      lcd.clear(); lcd.setCursor(0, 0);
      lcd.print("Communication");
      lcd.setCursor(0, 0);
      lcd.print("error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      lcd.clear(); lcd.setCursor(0, 0);
      lcd.print("No fingerprint");
      lcd.print("features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      lcd.clear(); lcd.setCursor(0, 0);
      lcd.print("No fingerprint ");
      lcd.print("features");
      return p;
    default:
      lcd.clear(); lcd.setCursor(3, 0);
      lcd.print("Unknown error");
      return p;
  }
  delay(1000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  lcd.clear(); lcd.setCursor(0, 0);
  lcd.print("Remove finger");
  delay(1500);
  p = -1;
  lcd.clear(); lcd.setCursor(0, 0);
  lcd.print("Place same finger");
  lcd.setCursor(0, 1);
  lcd.print("again");
  delay(2000);
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        lcd.clear(); lcd.setCursor(3, 0);
        lcd.print("Image taken");
        delay(1000);
        break;
      case FINGERPRINT_NOFINGER:
        lcd.clear(); lcd.setCursor(0, 0);
        lcd.print(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        lcd.clear(); lcd.setCursor(0, 0);
        lcd.print("Communication");
        lcd.print("error");
        break;
      case FINGERPRINT_IMAGEFAIL:
        lcd.clear(); lcd.setCursor(1, 0);
        lcd.print("Imaging error");
        break;
      default:
        lcd.clear(); lcd.setCursor(2, 0);
        lcd.print("Unknown error");
        break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      lcd.clear(); lcd.setCursor(0, 0);
      lcd.print("Image converted");
      delay(1000);
      break;
    case FINGERPRINT_IMAGEMESS:
      lcd.clear(); lcd.setCursor(0, 0);
      lcd.print("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      lcd.clear(); lcd.setCursor(0, 0);
      lcd.print("Communication");
      lcd.print("error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      lcd.clear(); lcd.setCursor(0, 0);
      lcd.print("No fingerprint");
      lcd.print("features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      lcd.clear(); lcd.setCursor(0, 0);
      lcd.print("No fingerprint ");
      lcd.print("features");
      return p;
    default:
      lcd.clear(); lcd.setCursor(3, 0);
      lcd.print("Unknown error");
      return p;
  }

  // OK converted!
  lcd.clear(); lcd.setCursor(0, 0);
  lcd.print("Creating model");
  lcd.setCursor(0, 1);
  lcd.print("for #");  lcd.print(id);
  delay(1000);

  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    lcd.clear(); lcd.setCursor(0, 0);
    lcd.print("Prints matched!");
    delay(2000);
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    lcd.clear(); lcd.setCursor(0, 0);
    lcd.print("Communication ");
    lcd.print("error");
    return p;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    lcd.clear(); lcd.setCursor(0, 0);
    lcd.print("Fingerprints ");
    lcd.setCursor(0, 1);
    lcd.print("did not match");
    delay(2000);
    return p;
  } else {
    lcd.clear(); lcd.setCursor(0, 0);
    lcd.print("Unknown error");
    return p;
  }
  lcd.clear(); lcd.setCursor(4, 0);
  lcd.print("ID "); lcd.print(id);
  delay(1000);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    lcd.setCursor(3, 1);
    lcd.print("Stored!");
    //    digitalWrite(buzzer,HIGH);delay(500);digitalWrite(buzzer,LOW);
    delay(2500);
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    lcd.print("Communication");
    lcd.print("error");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    lcd.clear(); lcd.setCursor(0, 0);
    lcd.print("Can't store in");
    lcd.print("that location");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    lcd.clear(); lcd.setCursor(0, 0);
    lcd.print("Error writing");
    lcd.print("to flash");
    return p;
  } else {
    lcd.clear(); lcd.setCursor(0, 0);
    lcd.print("Unknown error");
    return p;
  }
}




////////////////////////////////////////////////////////////////////////////////
uint8_t deleteFingerprint(uint8_t id) {
  uint8_t p = -1;

  p = finger.deleteModel(id);

  if (p == FINGERPRINT_OK) {
    lcd.clear(); lcd.setCursor(0, 0);
    lcd.print("Deleting...");
    lcd.clear(); lcd.setCursor(0, 0);
    lcd.print("Deleted!");
    delay(2000);
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    lcd.print("Communication error");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    lcd.clear(); lcd.setCursor(0, 0);
    lcd.print("Could not delete in that location");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    lcd.print("Error writing to flash");
    return p;
  } else {
    lcd.clear(); lcd.setCursor(0, 0);
    lcd.print("Unknown error: 0x"); lcd.print(p, HEX);
    return p;
  }
}



// returns -1 if failed, otherwise returns ID #
int getFingerprintIDez() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)  return -1;

  // found a match!
  lcd.print("Found ID #"); lcd.print(finger.fingerID);
  lcd.clear(); lcd.setCursor(0, 0);
  lcd.print("Accuracy of "); lcd.setCursor(0, 1); lcd.print(finger.confidence); lcd.print("/250");
  delay(1000);
  lcd.clear();
  lcd.print("Hello ");
  lcd.print(finger.fingerID);
  return finger.fingerID;
}

void menu(int value,int value2) {
  if (flagMenu1 == true) {
    voltage = map(value,66,1014,0,2);   //chuyển thang đo của value 
                                    //từ 0-1023 sang 0-5000 (mV)
    if(voltage == 0){
      b = true;
      c = true;
      if (a == true){
        Serial.println("Scan your finger"); 
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("1/Scan finger");   
        a = false;
      }
    }
    if(voltage == 1){
      a = true;
      c = true;
      if (b == true){
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("2/Create finger ");
        Serial.println("Create finger");      
        b = false;
      }
    }
    if(voltage == 2){
      b = true;
      a = true;
      if (c == true){
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("3/Remove finger");
        Serial.println("Remove finger");      
        c = false;
      }
    }
  }
  if (flagMenu2 == true) {
    if (voltage == 0) {
      Serial.println("Click scane");
    } else if (voltage == 1) {
        Serial.println("Click Create");
        d = true;
      if (d == true) {
        int voltage2 = map(value,0,1014,0,69);   //chuyển thang đo của value 
        int voltage3 = map(value2,66,1014,0,9);
        lcd.clear();
        lcd.setCursor(0,0);
        lcd.print("Choose ID: #");
        if (voltage2 < 0 ) {
          voltage2 = 0;
        }
        Serial.println(voltage2*10 + voltage3);
        lcd.print(voltage2);
        lcd.print(voltage3);
        d = false;
      }
    } else {
        Serial.println("Click Remove");
    }
  }
  //Check click ENTER
  if((stateENTER != lastENTER) && (stateENTER == 0)){
    flagMenu1 = false;
    flagMenu2 = true; 
  }
  lastENTER = stateENTER;  
  //Check click BACk
  if((stateBACK != lastBACK) && (stateBACK == 0)){
    Serial.println("BACK Click");  
    flagMenu1 = true;
    flagMenu2 = false;
    voltage = map(value,15,1000,0,2);
    lcd.clear();
    if (a == false) {
      a = true;
    } else if (b == false) {
      b = true;  
    } else {
      c = true;  
    }
  }
  lastBACK = stateBACK;
  delay(10);             
}
