
#include <Adafruit_Fingerprint.h>
#include <Wire.h>;
#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C.h>;


//Bien tro 1: A4 Bien Tro 2: A5
//Nut enter : 2 Nut Back: 3
//
/* Địa chỉ của DS1307 */
const byte DS1307 = 0x68;
/* Số byte dữ liệu sẽ đọc từ DS1307 */
const byte NumberOfFields = 7;
/* khai báo các biến thời gian */
int second, minute, hour, day, wday, month, year;



uint8_t getFingerprintEnroll();
uint16_t id;
LiquidCrystal_I2C lcd(0x3F,16,2);
//SoftwareSerial Serial1(2, 3);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial1);
int daySet = 0;
int monthSet = 0;
int yearSet = 0;

boolean a = true;
boolean b = true;
boolean c = true;
boolean d = true;
boolean e = true;
#define ENTER   2
#define BACK    3
int stateENTER=1;
int lastENTER =1; 
int stateBACK=1;
int lastBACK =1;

int voltage;
int oldVoltage1;
int voltage2;

boolean flagMenu1 = false; //Menu chon changepassword hoac scan ...
boolean flagMenu2 = false; //Menu da chon
boolean flagMenu0 = true; //Menu nhap password
boolean flagMenu3 = false; // Sau khi nhap ngay thang xong
boolean flagMenu4 = false;
boolean flagMenu5 = false; //Menu change Passs;
boolean didClickDoneDayAndMonth = false;

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
  Wire.begin();
//  setTime(12, 30, 45, 1, 8, 2, 15); // 12:30:45 CN 08-02-2015
  
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
  lcd.clear();
  lcd.print("Press admin password");
  delay(2000);
}
void loop()
{
  /* Đọc dữ liệu của DS1307 */
  //readDS1307();
  /* Hiển thị thời gian ra Serial monitor */
  //digitalClockDisplay();

  
  //read button ENTER
  stateENTER = digitalRead(ENTER);
  //read button BACK  
  stateBACK = digitalRead(BACK);
  
  //Doc Cam Bien Menu
  int value = analogRead(A3);
  int value2 = analogRead(A2);
  nhapMatKhau(value,value2);
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

void readDS1307()
{
        Wire.beginTransmission(DS1307);
        Wire.write((byte)0x00);
        Wire.endTransmission();
        Wire.requestFrom(DS1307, NumberOfFields);
        
        second = bcd2dec(Wire.read() & 0x7f);
        minute = bcd2dec(Wire.read() );
        hour   = bcd2dec(Wire.read() & 0x3f); // chế độ 24h.
        wday   = bcd2dec(Wire.read() );
        day    = bcd2dec(Wire.read() );
        month  = bcd2dec(Wire.read() );
        year   = bcd2dec(Wire.read() );
        year += 2000;    
}
/* Chuyển từ format BCD (Binary-Coded Decimal) sang Decimal */
int bcd2dec(byte num)
{
        return ((num/16 * 10) + (num % 16));
}
/* Chuyển từ Decimal sang BCD */
int dec2bcd(byte num)
{
        return ((num/10 * 16) + (num % 10));
}
 
void digitalClockDisplay(){
    // digital clock display of the time
    Serial.print(hour);
    printDigits(minute);
    printDigits(second);
    Serial.print(" ");
    Serial.print(day);
    Serial.print(" ");
    Serial.print(month);
    Serial.print(" ");
    Serial.print(year); 
    Serial.println(); 
}
 
void printDigits(int digits){
    // các thành phần thời gian được ngăn chách bằng dấu :
    Serial.print(":");
        
    if(digits < 10)
        Serial.print('0');
    Serial.print(digits);
}
 
/* cài đặt thời gian cho DS1307 */
void setTime(byte hr, byte min, byte sec, byte wd, byte d, byte mth, byte yr)
{
        Wire.beginTransmission(DS1307);
        Wire.write(byte(0x00)); // đặt lại pointer
        Wire.write(dec2bcd(sec));
        Wire.write(dec2bcd(min));
        Wire.write(dec2bcd(hr));
        Wire.write(dec2bcd(wd)); // day of week: Sunday = 1, Saturday = 7
        Wire.write(dec2bcd(d)); 
        Wire.write(dec2bcd(mth));
        Wire.write(dec2bcd(yr));
        Wire.endTransmission();
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
  voltage = map(value,66,1014,0,4);//chuyển thang đo của value 
  Serial.println(voltage);
  if (flagMenu1 == true) {                                    //từ 0-1023 sang 0-5000 (mV)
    if((voltage == 0)){
      b = true;
      c = true;
      d = true;
      e = true;
      if (a == true){
        Serial.println("Scan your finger"); 
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("1/Scan finger");   
        a = false;
      }
      if((stateENTER != lastENTER) && (stateENTER == 0)){
      }
    } else
    if((voltage == 1)){
      a = true;
      c = true;
      d = true;
      e = true;
      if (b == true){
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("2/Create finger ");
        Serial.println("Create finger");      
        b = false;
      }
      if((stateENTER != lastENTER) && (stateENTER == 0)){
        lastENTER = stateENTER;
        voltage = map(value,66,1014,0,4);
        flagMenu1 = false;
        flagMenu0 = false;
        flagMenu2 = true; 
        Serial.println(voltage);
      }
    } else 
    if((voltage == 2)){
      b = true;
      a = true;
      d = true;
      e = true;
      if (c == true){
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("3/Remove finger");
        Serial.println("Remove finger");      
        c = false;
      }
      if((stateENTER != lastENTER) && (stateENTER == 0)){
        lastENTER = stateENTER;
        
      }
    } else
    if((voltage == 3)){
      b = true;
      a = true;
      c = true;
      e = true;
      if (d == true){
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("4/Change pass");
        Serial.println("4/Change pass");      
        d = false;
      }
      if((stateENTER != lastENTER) && (stateENTER == 0)){
        lastENTER = stateENTER;
        flagMenu1 = false;
        flagMenu5 = true;
      }
    } else 
    if((voltage == 4)){
      b = true;
      a = true;
      c = true;
      d = true;
      if (e == true){
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("5/Set Time");
        Serial.println("5/Set Time");      
        e = false;
      }
      if((stateENTER != lastENTER) && (stateENTER == 0)){
        flagMenu1 = false;
        flagMenu0 = false;
        flagMenu2 = true;
        lastENTER = stateENTER;
      }
    }
      //Check click ENTER
    if((stateENTER != lastENTER) && (stateENTER == 0)){
      flagMenu1 = true;
      flagMenu2 = false;
      flagMenu0 = false;
      lastENTER = stateENTER;
    }
    if((stateBACK != lastBACK) && (stateBACK == 0)){
      Serial.println("BACK Click");  
        flagMenu1 = false;
        flagMenu2 = false;
        flagMenu0 = true;
        voltage = map(value,15,1000,0,2);
        lcd.clear();
        if (a == false) {
          a = true;
        } else if (b == false) {
          b = true;  
        } else if (c == false) {
          c = true;  
        } else {
          d = true;
        }
      
    }
  } else
  if (flagMenu2 == true) {
    if (voltage == 0) {
      Serial.println("Click scane");
    } else if (voltage == 1) {
      Serial.println("Click Create");
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
      
      if((stateBACK != lastBACK) && (stateBACK == 0)){
        lastENTER = stateENTER;
        flagMenu1 = true;
        flagMenu2 = false; 
        lcd.clear();
      }      
    } else if (voltage == 2){
      Serial.println("Click Remove");
    } else if (voltage == 3) {
      
    } else if (voltage == 4) {
      Serial.println("Click Date");
      int ngay = map(value,0,1014,1,31);   //chuyển thang đo của value 
      int thang = map(value2,0,1014,1,12);
      if (ngay < 1 ) {
        ngay = 1;
      }
      if (thang < 1) {
        thang = 1;  
      }
      lcd.clear();
      lcd.setCursor(0,0);
      daySet = ngay;
      monthSet = thang;
      lcd.print("Time:");lcd.print(ngay);lcd.print("/");lcd.print(thang);

      if((stateENTER != lastENTER) && (stateENTER == 0)){
        flagMenu3 = true;
        flagMenu1 = false;
        flagMenu2 = false;
        Serial.println("DidClickSetNam");
        flagMenu0 = false;
        lastENTER = stateENTER;  
      }
      if((stateBACK != lastBACK) && (stateBACK == 0)){
        Serial.println("BACK Click");  
        flagMenu1 = true;
        flagMenu2 = false;
        voltage = 4;
        lcd.clear();
        if (a == false) {
          a = true;
        } else if (b == false) {
          b = true;  
        } else if (c == false) {
          c = true;  
        } else {
            d = true;
        }
      }
      
      delay(20);
    }
  } else if (flagMenu3 == true) {
    int nam = map(value,0,1014,2017,3000);
    lcd.clear();
    lcd.setCursor(0,0);
    yearSet = nam;
    lcd.print("Time:");lcd.print(daySet);lcd.print("/");lcd.print(monthSet);;lcd.print("/");lcd.print(yearSet);
    if((stateENTER != lastENTER) && (stateENTER == 0)){
        flagMenu3 = false;
        Serial.println("DidClickSetYear");
        lastENTER = stateENTER;
        flagMenu4 = true;
    }
    if((stateBACK != lastBACK) && (stateBACK == 0)){
      Serial.println("BACK Click");  
      flagMenu2 = true;
      flagMenu3 = false;
      lcd.clear();
      if (a == false) {
        a = true;
      } else if (b == false) {
        b = true;  
      } else if (c == false) {
        c = true;  
      } else {
        d = true;
      }
    }
   } else if (flagMenu4 == true) {
     int gio = map(value,0,1014,1,24);
     int phut = map(value2,0,1014,0,60);
     lcd.clear();
     lcd.setCursor(0,0);
     lcd.print("Time:");lcd.print(daySet);lcd.print("/");lcd.print(monthSet);;lcd.print("/");lcd.print(yearSet);
     delay(20);
     lcd.setCursor(0,1);
     lcd.print("Time:");lcd.print(gio);lcd.print(":");lcd.print(phut);
     if((stateENTER != lastENTER) && (stateENTER == 0)){
      Serial.println("didClickSetTime");
      setTime(gio, phut, 0, 1, daySet, monthSet, yearSet); // 12:30:45 CN 08-02-2015
      lastENTER = stateENTER;
      flagMenu4 = true;
     }
     if((stateBACK != lastBACK) && (stateBACK == 0)){
      Serial.println("BACK Click"); 
      lastBACK = stateBACK; 
      flagMenu3 = true;
      flagMenu4 = false;
      lcd.clear();
      if (a == false) {
        a = true;
      } else if (b == false) {
        b = true;  
      } else if (c == false) {
        c = true;  
      } else {
          d = true;
      }
     }
   } else if (flagMenu5 == true) {
     int pass1 = map(value,0,1014,0,99);
     int pass2 = map(value2,0,1014,0,99);
     lcd.clear();
     lcd.setCursor(0,0);
     lcd.print("Pass Change:");lcd.print(pass1);lcd.print(pass2);
     if((stateBACK != lastBACK) && (stateBACK == 0)){
      Serial.println("BACK Click"); 
      lastBACK = stateBACK;
      flagMenu1 = true;
      flagMenu2 = false;
      flagMenu5 = false;
      lcd.clear();
      if (a == false) {
        a = true;
      } else if (b == false) {
        b = true;  
      } else if (c == false) {
        c = true;  
      } else {
          d = true;
      }
     }
   }

  lastENTER = stateENTER;  
  lastBACK = stateBACK;
  delay(10);             
}


void nhapMatKhau(int value,int value2) {
  if ((flagMenu0 == true)) {
    int voltage2 = map(value,0,1014,0,99);   //chuyển thang đo của value 
    int voltage3 = map(value2,0,1014,0,99);
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Password:");
    if (voltage2 < 0 ) {
      voltage2 = 0;
    }
    Serial.println(voltage2*10 + voltage3);
    lcd.print(voltage2);
    lcd.print(voltage3);
    if((stateENTER != lastENTER) && (stateENTER == 0)){
      if (((voltage2*100)+(voltage3)) != 7777) {
        lcd.clear();
        Serial.println(voltage2+voltage3);
        lcd.print("Nhap sai password");
        delay(1000);
      } else {
        flagMenu1 = true;
        flagMenu2 = false;
        flagMenu0 = false;
      } 
      lastENTER = stateENTER;
    }
  }  
}
