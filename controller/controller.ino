void setup() {
    Serial.begin(9600);
    pinMode(A0, INPUT_PULLUP);
    pinMode(A3, INPUT_PULLUP);
}

void loop() {
    int a       = !digitalRead(A0);
    int xValue1 = 1023 - analogRead(A1);
    int yValue1 = analogRead(A2);
    int b       = !digitalRead(A3); 
    int xValue2 = 1023 - analogRead(A4);
    int yValue2 = analogRead(A5);


    // Send the data to the computer
    Serial.print(xValue1);
    Serial.print(",");
    Serial.print(yValue1);
    Serial.print(",");
    Serial.print(xValue2);
    Serial.print(",");
    Serial.print(yValue2);
    Serial.print(",");
    Serial.print(a);
    Serial.print(",");
    Serial.println(b);

    delay(10);  // Adjust delay as needed
}
