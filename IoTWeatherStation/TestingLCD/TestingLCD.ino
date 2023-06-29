#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27,16,2);

void setup(){
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
}

void loop(){
    Serial.print("Temperature: ");
    lcd.setCursor(0,0);
    lcd.print("Temperature: ");
    
    Serial.print("10");
    Serial.println(" *C");
    lcd.setCursor(0,1);
    lcd.print("10");
    lcd.print(" ");
    lcd.print(char(223));
    lcd.print("C");
       
    delay(500);
}
