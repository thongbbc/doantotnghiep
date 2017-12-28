#include <EEPROM.h>




#include <easyFingerprint.h>

#include <Wire.h>;
#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C.h>;
#include <Keypad.h>
#include <Key.h>
#include <SD.h>
#define SD_ChipSelectPin 53  //sử dụng SS Pin 53 trên Mega2560
//#define SD_ChipSelectPin 4  //thường sử dụng digital pin 4 trên arduino nano 328, hoặc chân tùy ý
#include <SPI.h>
String file_name = "test.csv";
//đối tượng file
File myFile;
      
    const byte rows = 4; //số hàng
    const byte columns = 4; //số cột
    int holdDelay = 700; //Thời gian trễ để xem là nhấn 1 nút nhằm tránh nhiễu
    int n = 3; // 
    int state = 0; //nếu state =0 ko nhấn,state =1 nhấn thời gian nhỏ , state = 2 nhấn giữ lâu
    char key = 0;
    String fullKey = "";
    //Định nghĩa các giá trị trả về
    char keys[rows][columns] =
    {
      {'1', '2', '3', 'A'},
      {'4', '5', '6', 'B'},
      {'7', '8', '9', 'C'},
      {'*', '0', '#', 'D'},
    };
     
    byte rowPins[rows] = {32, 33, 34, 35}; //Cách nối chân với Arduino
    byte columnPins[columns] = {36, 37, 38, 39};
     
    //cài đặt thư viện keypad
    Keypad keypad = Keypad(makeKeymap(keys), rowPins, columnPins, rows, columns);






















easyFingerprint fp1(&Serial1, true);
easyFingerprint fp2(&Serial2, true);
char fbuffer[688];
uint16_t id = 500;
unsigned long time1=0,time2=0;
boolean flagScan = true;
//Bien tro 1: A4 Bien Tro 2: A5
//Nut enter : 2 Nut Back: 3
//
/* Địa chỉ của DS1307 */
const byte DS1307 = 0x68;
/* Số byte dữ liệu sẽ đọc từ DS1307 */
const byte NumberOfFields = 7;
/* khai báo các biến thời gian */
int second, minute, hour, day, wday, month, year;
  int distance1=-50,distance2=0;           // biến lưu khoảng cách

  int distance3=-50,distance4=0;           // biến lưu khoảng cách



//uint8_t getFingerprintEnroll();
//uint16_t id;
LiquidCrystal_I2C lcd(0x3F,16,2);
//SoftwareSerial Serial1(2, 3);
//Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial1);

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



const int trig2 = 12;     // chân trig của HC-SR04
const int echo2 = 11;     // chân echo của HC-SR04

int button = 7;
int buttonsearch = 8;
int led = 5;
bool flagClickButton = false;
bool flagTemp = false;

int statusNow = LOW;
int statusPre = LOW;



void setup(){
    Serial3.begin(115200);
//    Serial.begin(115200);
  Serial.print("Initializing SD card...");

  if (!SD.begin(SD_ChipSelectPin)) {
    Serial.println("initialization failed!");
  }
  Serial.println("initialization done.");


  EEPROM.write(0, 11);
  EEPROM.write(1,11);
  
  
  
  Wire.begin();
//  setTime(12, 30, 45, 1, 8, 2, 15); // 12:30:45 CN 08-02-2015
  
 
  pinMode(ENTER, INPUT_PULLUP);
  pinMode(BACK, INPUT_PULLUP);
  pinMode(trig,OUTPUT);   // chân trig sẽ phát tín hiệu
  pinMode(echo,INPUT);    // chân echo sẽ nhận tín hiệu

  
  pinMode(trig2,OUTPUT);   // chân trig sẽ phát tín hiệu
  pinMode(echo2,INPUT);    // chân echo sẽ nhận tín hiệu

  
  //LCD
  lcd.init();       //Khởi động màn hình. Bắt đầu cho phép Arduino sử dụng màn hình
  lcd.backlight();   //Bật đèn nền
  lcd.display();
  lcd.setCursor(0, 0);
    
  pinMode(button, INPUT);  //Cài đặt chân D11 ở trạng thái đọc dữ liệu
  pinMode(led,OUTPUT); // Cài đặt chân D2 dưới dạng OUTPUT
  pinMode(buttonsearch,INPUT_PULLUP);
  delay(2000);
  lcd.clear();
  lcd.print("Press admin password");
  delay(2000);
  

  while(!Serial);
  fp1.init(57600);
  fp2.init(57600);
//  fp1.erase();
//  fp2.erase();
//  while(FP_SUCCESS != fp2.save(160));
//  fp2.upload(160, fbuffer);
//  fp1.download(160, fbuffer);
  
}
void loop()
{
  if (time1 != 0 ) {
    time2 = millis();
    if ((time2 - time1) > 5000) {
      flagScan = false;
      time1 = 0;
    }
  }


  
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
      unsigned long duration2; // biến đo thời gian

  /* Phát xung từ chân trig */
  
//
//
//
 


  digitalWrite(trig2,0);   // tắt chân trig
  delayMicroseconds(2);
  digitalWrite(trig2,1);   // phát xung từ chân trig
  delayMicroseconds(5);   // xung có độ dài 5 microSeconds
  digitalWrite(trig2,0);   // tắt chân trig

//  
//  /* Tính toán thời gian */
  // Đo độ rộng xung HIGH ở chân echo. 
  duration2 = pulseIn(echo2,HIGH);
  // Tính khoảng cách đến vật.
  distance4 = int(duration2/2/29.412);
  Serial.println("distance4:" + String(distance4));
if (distance4 <=10 && ((distance4 - distance3) >=1 || ((distance3 - distance4) >=1))) {    
      distance3 = distance4;
      int dem = 0;
//      while(dem != 5 && id == 500)
//      {
//        dem++;
        fp2.scan(&id);
        fp1.scan(&id);
        delay(1000);
//      }
      delay(300);
      if (id == 500) {
        lcd.clear();
        lcd.print("WRONG ID");
        delay(3000);
        lcd.clear();
        lcd.print("WELCOME TO VLTH");
      } else {
      myFile = SD.open(file_name, FILE_WRITE);
      
        // if the file opened okay, write to it:
        if (myFile) {
          Serial.print("Writing to test.csv...");
          readDS1307();
          String data = String(id)+"-ra-"+String(hour)+":"+String(minute)+":"+String(second)+"-"+String(day)+"/"+String(month)+"/"+String(year);
          myFile.println(data);
          // close the file:
          myFile.close();
          Serial.println("done.");
        } else {
          // if the file didn't open, print an error:
          Serial.println("error opening test.csv");
        }

        
        String request ="id="+String(id)+"&typeTrip=false";
        char requestArray[255];
        request.toCharArray(requestArray,255);
        Serial3.write(requestArray);
        id = 500;
        lcd.clear();
        lcd.print("SCAN SUCCESS");
        delay(3000);
        lcd.clear();
        lcd.print("WELCOME TO VLTH");
      }
    }







  delay(20);
  

  digitalWrite(trig,0);   // tắt chân trig
  delayMicroseconds(2);
  digitalWrite(trig,1);   // phát xung từ chân trig
  delayMicroseconds(5);   // xung có độ dài 5 microSeconds
  digitalWrite(trig,0);   // tắt chân trig
  /* Tính toán thời gian */
  // Đo độ rộng xung HIGH ở chân echo. 
  duration = pulseIn(echo,HIGH);
  // Tính khoảng cách đến vật.
  distance2 = int(duration/2/29.412);
    Serial.println("distance2:" + String(distance2));

    if (distance2 <=10 && ((distance2 - distance1) >=1 || ((distance1 - distance2) >=1))) {    
      distance1 = distance2;
      int dem = 0;
//      while(dem != 5 && id == 500)
//      {
//        dem++;
        fp2.scan(&id);
        fp1.scan(&id);
        delay(1000);
//      }
      delay(300);
      if (id == 500) {
        lcd.clear();
        lcd.print("WRONG ID");
        delay(3000);
        lcd.clear();
        lcd.print("WELCOME TO VLTH");
      } else {
      myFile = SD.open(file_name, FILE_WRITE);
      
        // if the file opened okay, write to it:
        if (myFile) {
          Serial.print("Writing to test.csv...");
          readDS1307();
          String data = String(id)+"-vao-"+String(hour)+":"+String(minute)+":"+String(second)+"-"+String(day)+"/"+String(month)+"/"+String(year);
          myFile.println(data);
          // close the file:
          myFile.close();
          Serial.println("done.");
        } else {
          // if the file didn't open, print an error:
          Serial.println("error opening test.csv");
        }

        
        String request ="id="+String(id)+"&typeTrip=true";
        char requestArray[255];
        request.toCharArray(requestArray,255);
        Serial3.write(requestArray);
        id = 500;
        lcd.clear();
        lcd.print("SCAN SUCCESS");
        delay(3000);
        lcd.clear();
        lcd.print("WELCOME TO VLTH");
      }
    }





    
  
  /* In kết quả ra Serial Monitor */
  //Serial.print(distance);
  //Serial.println("cm");
  delay(200);











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





void menu(int value,int value2) {
  Serial.println(voltage);
  if (flagMenu1 == true) {    
      voltage = map(value,66,1014,0,5);//chuyển thang đo của value 
//từ 0-1023 sang 0-5000 (mV)
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
         fp2.scan(&id);
        fp1.scan(&id);
        delay(1000);
        if (id == 500) {
          lcd.clear();
          lcd.print("WRONG ID");
          delay(3000);
          lcd.clear();
          lcd.print("WELCOME TO VLTH");
        } else {
           id = 500;
          lcd.clear();
          lcd.print("SCAN SUCCESS");
          delay(3000);
          lcd.clear();
          lcd.print("WELCOME TO VLTH");
        }
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
        voltage = 1;
        flagMenu1 = false;
        flagMenu0 = false;
        flagMenu2 = true; 
//        Serial.println(voltage);
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
        lcd.print("3/Erase finger");
        Serial.println("Erase finger");      
        c = false;
      }
      if((stateENTER != lastENTER) && (stateENTER == 0)){
        lastENTER = stateENTER;
        fp1.erase();
        fp2.erase(); 
        lcd.clear();
        lcd.print("Success");
        delay(3000);
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
      int voltage2 = map(value,0,1014,0,15);   //chuyển thang đo của value 
      int voltage3 = map(value2,0,1014,0,9);
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print("Choose ID: #");
      if (voltage2 < 0 ) {
        voltage2 = 0;
      }
      int valueNumber = voltage2*10 + voltage3;
      Serial.println(valueNumber);
      lcd.print(voltage2);
      lcd.print(voltage3);
      


      if((stateENTER != lastENTER) && (stateENTER == 0)){
        
        while(FP_SUCCESS != fp2.save(valueNumber));
        fp2.upload(valueNumber, fbuffer);
         fp1.download(valueNumber, fbuffer);
        flagMenu1 = true;
        flagMenu2 = false;
        lastENTER = stateENTER;  
      }
       

      
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
    int nam = map(value,0,1014,1990,2050);
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
      lcd.clear();
      lcd.print("Success");
      delay(3000);
      lastENTER = stateENTER;
      flagMenu4 = false;
      flagMenu3 = false;
      flagMenu2 = false;
      flagMenu1 = true;
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
//     int pass1 = map(value,0,1014,0,99);
//     int pass2 = map(value2,0,1014,0,99);
      char temp = keypad.getKey();     
      if ((int)keypad.getState() ==  PRESSED) {
        if (temp != 0) {
          if (temp == 'D') {
            if(fullKey != "") {
              fullKey = fullKey.substring(0,fullKey.length()-1);
            }
          } else {
            key = temp;
            if (fullKey.length()<=3) {
              fullKey=fullKey+key;
            }
          }
        }
      }
      delay(100);






     lcd.clear();
     lcd.setCursor(0,0);
     lcd.print("Pass Change:");lcd.print(fullKey);
     if((stateENTER != lastENTER) && (stateENTER == 0)){
        int numberKey = fullKey.toInt();
        int pass1 = numberKey /100;
        int pass2 = numberKey %100;
        EEPROM.write(0,pass1);
        EEPROM.write(1,pass2);
        
        fullKey = "";
        lastENTER = stateENTER;  
        flagMenu1 = true;
        flagMenu2 = false;
        flagMenu5 = false;
        lcd.clear();
        lcd.print("Success");
        delay(3000);
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
     if((stateBACK != lastBACK) && (stateBACK == 0)){
        Serial.println("BACK Click"); 
        fullKey = "";
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
//    int voltage2 = map(value,0,1014,0,99);   //chuyển thang đo của value 
//    int voltage3 = map(value2,0,1014,0,99);
    char temp = keypad.getKey();     
      if ((int)keypad.getState() ==  PRESSED) {
        if (temp != 0) {
          if (temp == 'D') {
            if(fullKey != "") {
              fullKey = fullKey.substring(0,fullKey.length()-1);
            }
          } else {
            key = temp;
            if (fullKey.length()<=3) {
              fullKey=fullKey+key;
            }
          }
        }
      }
      delay(100);


    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Password:");
    lcd.print(fullKey);
//    if (voltage2 < 0 ) {
//      voltage2 = 0;
//    }
//    Serial.println(voltage2*10 + voltage3);
//    lcd.print(voltage2);
//    lcd.print(voltage3);
    if((stateENTER != lastENTER) && (stateENTER == 0)){
//      if (((voltage2*100)+(voltage3)) != 7777) {
//        lcd.clear();
//        Serial.println(voltage2+voltage3);
      int pass1 = EEPROM.read(0);
      int pass2 = EEPROM.read(1);
      int fullPass = pass1*100 + pass2;
      if (fullKey.toInt() != fullPass){
        lcd.print("Nhap sai password");
        delay(1000);
      } else {
        fullKey = "";
        flagMenu1 = true;
        flagMenu2 = false;
        flagMenu0 = false;
      } 
      lastENTER = stateENTER;
    }
  }  
}
