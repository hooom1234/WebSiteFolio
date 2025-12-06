// src/data/myproject/smarttoilet.js

export const projectData = {
  title: "Smart Toilet System",
  subtitle: "ห้องน้ำอัจฉริยะแบบไร้การสัมผัสด้วย AI", //
  description: "นวัตกรรมห้องน้ำสาธารณะต้นแบบที่นำเทคโนโลยีเซนเซอร์และปัญญาประดิษฐ์ (AI) มาประยุกต์ใช้เพื่อลดการสัมผัส (Touchless) ป้องกันการแพร่ระบาดของเชื้อโรค โดยผู้ใช้งานสามารถสั่งการเปิด-ปิดประตู, กดชักโครก และเปิดถังขยะได้ผ่านสัญลักษณ์มือ (Hand Gesture) พร้อมระบบแจ้งสถานะการเข้าใช้งานอัตโนมัติ", //
  tags: ["Arduino", "AI Hand Tracking", "IoT", "PictoBlox", "Smart Automation"], //

  // --- ✨ Gallery (ใส่รูป Placeholder ไว้ให้ครับ) ✨ ---
  gallery: [
    {
      src: "https://res.cloudinary.com/dg0uswwo4/image/upload/f_auto/v1765027283/420637537_2106476606417749_4370207783311886012_n_bbobw6.jpg", // Placeholder: Arduino/Circuit
      alt: "",
      caption: "overview of Smart Toilet System (Front)" 
    },
    {
      src: "https://res.cloudinary.com/dg0uswwo4/image/upload/f_auto/v1765027268/420493927_789528639672504_7647500225034578779_n_dvpf3r.jpg", // Placeholder: AI Hand Tracking
      alt: "Hand Gesture Recognition",
      caption: "overview of Smart Toilet System (Above)" 
    },
    
  ],
  
  // --- เนื้อหาแต่ละส่วน (Sections) ---
  sections: [
    {
      id: "intro",
      title: "ที่มาและความสำคัญ",
      content: "ในยุคปัจจุบันที่มีการแพร่ระบาดของเชื้อไวรัส (เช่น COVID-19) ห้องน้ำสาธารณะถือเป็นจุดเสี่ยงสำคัญ โครงงานนี้จึงเกิดขึ้นเพื่อแก้ปัญหาความสะอาดและการสัมผัสพื้นผิวร่วม โดยการสร้างระบบอัตโนมัติที่อำนวยความสะดวกให้แก่ผู้ใช้งาน รวมถึงผู้สูงอายุและผู้พิการ ให้สามารถใช้งานห้องน้ำได้โดยไม่ต้องสัมผัสอุปกรณ์", //
    },
    {
      id: "architecture",
      title: "การทำงานของระบบ (System Architecture)",
      content: "ระบบควบคุมด้วยบอร์ด Arduino UNO ทำงานร่วมกับโปรแกรม PictoBlox และ AI Hand Pose Classifier โดยใช้ Ultrasonic Sensor ตรวจจับคนเข้า-ออก และใช้กล้องจับภาพสัญลักษณ์มือเพื่อสั่งการ Servo Motor ในการควบคุมกลไกต่างๆ ภายในห้องน้ำ", //
    },
    {
      id: "features",
      title: "ฟีเจอร์หลัก (Key Features)",
      list: [
        "Touchless Entry: เปิด-ปิดประตูและไฟอัตโนมัติด้วย Ultrasonic Sensor", //
        "AI Gesture Control: สั่งกดชักโครกและเปิดถังขยะด้วยสัญลักษณ์มือ", //
        "Smart Status: แสดงสถานะห้องน้ำ (Welcome/Unavailable) ผ่านจอ LCD", //
        "Auto Lighting: ระบบไฟ RGB อัตโนมัติเมื่อมีผู้ใช้งาน" //
      ]
    }
  ],

  // --- Code Snippets (จำลอง Logic C++ จาก Flowchart ใน PDF) ---
  codeSnippets: {
    source: `// Smart Toilet System Logic (Arduino Concept)
#include <Servo.h>
#include <LiquidCrystal_I2C.h>

// Define Sensors & Actuators
#define TRIG_PIN 9
#define ECHO_PIN 10
#define DOOR_SERVO_PIN 3
#define FLUSH_SERVO_PIN 5
#define TRASH_SERVO_PIN 6

Servo doorServo;
Servo flushServo;
Servo trashServo;
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  doorServo.attach(DOOR_SERVO_PIN);
  lcd.begin();
  lcd.print("Welcome"); //
}

void loop() {
  long duration, distance;
  // Ultrasonic Detection Logic
  digitalWrite(TRIG_PIN, LOW); delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  duration = pulseIn(ECHO_PIN, HIGH);
  distance = (duration / 2) / 29.1;

  // 1. Enter Bathroom Logic
  if (distance < 50) { // Person Detected
    lcd.clear();
    lcd.print("Unavailable"); //
    openDoor();
    turnOnLights();
    delay(5000); // Wait 5s
    closeDoor();
  }

  // 2. AI Gesture Logic (Receive Signal from PictoBlox)
  if (Serial.available() > 0) {
    char gesture = Serial.read();
    
    if (gesture == '1') { // 1 Finger Gesture
       flushToilet(); 
       openTrashCan();
    } 
    else if (gesture == '5') { // 5 Fingers Gesture
       openDoor(); // Exit
       turnOffLights();
       lcd.print("Welcome"); // Reset Status
    }
  }
}`
  }
};