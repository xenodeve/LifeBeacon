# LifeBeacon (ไลฟ์บีคอน) 🚨

แอปพลิเคชันช่วยเหลือผู้ประสบภัยน้ำท่วมแบบ Real-time พร้อมระบบแผนที่ออฟไลน์, การติดตามตำแหน่งแบบประหยัดพลังงาน และระบบรายงานขอความช่วยเหลือ

## 📋 ภาพรวมโปรเจ็กต์

LifeBeacon ถูกพัฒนาขึ้นเพื่อเป็นเครื่องมือสื่อสารและระบุตำแหน่งสำหรับผู้ประสบภัยและทีมกู้ภัย โดยมุ่งเน้นการใช้งานในสถานการณ์ที่อินเทอร์เน็ตอาจไม่เสถียร หรือต้องการประหยัดแบตเตอรี่สูงสุด

โปรเจ็กต์ประกอบด้วยส่วนหลัก:
1.  **Mobile App (Expo/React Native)**: สำหรับผู้ใช้งานทั่วไปและผู้ประสบภัย
2.  **Backend/Dashboard (Planned)**: สำหรับทีมกู้ภัยเพื่อดูภาพรวมและจัดการความช่วยเหลือ

## 🏛️ System Architecture

```
┌────────────────────────┐                  ┌────────────────────────┐
│      Mobile App        │                  │    Cloud Services      │
│   (User / Victim)      │                  │                        │
│                        │                  │                        │
│  ┌──────────────┐      │     HTTPS /      │  ┌──────────────┐      │
│  │  Map Screen  │      │    WebSocket     │  │   Firebase   │      │
│  │ (Google Maps)│◄─────┼──────────────────┼─►│  (Firestore) │      │
│  └──────────────┘      │                  │  └──────────────┘      │
│         ▲              │                  │          ▲             │
│         │              │                  │          │             │
│  ┌──────────────┐      │                  │  ┌──────────────┐      │
│  │ Location Svc │      │    Live Link     │  │  Dashboard   │      │
│  │ (Background) │──────┼──────────────────┼─►│ (Web App)    │      │
│  └──────────────┘      │                  │  └──────────────┘      │
│                        │                  │                        │
└────────────────────────┘                  └────────────────────────┘
```

## 🎨 Features

### Mobile App (LifeBeacon_Mobile)
- ✅ **Offline-Ready Maps** - ใช้ Google Maps พร้อมระบบ Caching สำหรับดูแผนที่พื้นฐาน
- ✅ **Battery Optimized Tracking** - อัลกอริทึมติดตามตำแหน่งอัจฉริยะ ปรับความถี่ตามการเคลื่อนไหวและระดับแบตเตอรี่ (<20% โหมดประหยัด)
- ✅ **Live Location Sharing** - แชร์ตำแหน่งแบบ Semi-Realtime ผ่านลิงก์ (สร้าง User ID อัตโนมัติ)
- ✅ **Emergency Reporting** - แบบฟอร์มขอความช่วยเหลือ (อาหาร, ยา, อพยพ) พร้อมแนบรูปถ่าย
- ✅ **Thai Language Support** - รองรับภาษาไทยสมบูรณ์แบบด้วยฟอนต์ **IBM Plex Sans Thai**
- ✅ **Smart Notifications** - การแจ้งเตือนสถานะการทำงานแบบ Live Updates (Android)

## 🏗️ โครงสร้างโปรเจ็กต์

```
LifeBeacon/
├── LifeBeacon_Mobile/         # Source code ของแอปมือถือ (Expo)
│   ├── app/                   # Expo Router (Pages)
│   │   ├── (tabs)/            # Tab Navigation (Map, Report)
│   │   └── _layout.tsx        # Root Layout & Font Loading
│   ├── src/
│   │   ├── components/        # UI Components
│   │   │   └── MapScreen.tsx  # หน้าจอแผนที่หลัก + Logic การแชร์
│   │   ├── screens/
│   │   │   └── ReportScreen.tsx # หน้าจอรายงานขอความช่วยเหลือ
│   │   ├── services/          # Business Logic & Services
│   │   │   ├── LocationService.ts     # ระบบติดตามตำแหน่งเบื้องหลัง
│   │   │   ├── NotificationService.ts # ระบบแจ้งเตือน
│   │   │   └── UserManager.ts         # จัดการ User Identity
│   │   └── styles/
│   │       └── globalStyles.ts # Theme & Font Styles
│   ├── assets/                # รูปภาพและฟอนต์
│   ├── app.json               # Expo Configuration (Permissions, API Keys)
│   ├── eas.json               # EAS Build Configuration
│   ├── google-services.json   # Firebase Config (Ignored)
│   └── package.json
└── README.md                  # เอกสารฉบับนี้
```

## 🚀 Quick Start

### Prerequisites
- Node.js (LTS)
- Android Studio (สำหรับ Emulator หรือเสียบสายจริง)
- Expo Go (สำหรับทดสอบเบื้องต้น)

### 1. ติดตั้ง Dependencies

```bash
cd LifeBeacon_Mobile
npm install
```

### 2. ตั้งค่า Configuration

โปรเจ็กต์นี้ต้องการไฟล์ Config ที่มีความลับ (ไม่ถูกนำขึ้น Git):

1.  **Firebase Config**:
    - คัดลอก `google-services.example.json` เป็น `google-services.json`
    - ใส่ค่าจาก Firebase Project ของคุณ

2.  **Google Maps API Key & App Config**:
    - คัดลอก `app.example.json` เป็น `app.json`
    - ใส่ Google Maps API Key (Android SDK) แทนที่ `YOUR_GOOGLE_MAPS_API_KEY`

### 3. รันแอปพลิเคชัน

**สำหรับ Development (แนะนำ):**
```bash
npx expo run:android
```
*คำสั่งนี้จะ Build แอปแบบ Native ลงเครื่อง (ต้องต่อ Android Device หรือเปิด Emulator)*

**สำหรับ Expo Go (ฟีเจอร์ Background อาจทำงานไม่สมบูรณ์):**
```bash
npx expo start
```

## 🛠️ Tech Stack

- **Framework**: React Native, Expo (SDK 52)
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Maps**: react-native-maps (Google Maps Provider)
- **Location**: expo-location, expo-task-manager
- **Notifications**: expo-notifications
- **Storage**: async-storage (User Persistence)
- **UI/Fonts**: Custom Styles, IBM Plex Sans Thai

## 📚 Documentation

ดูรายละเอียดเพิ่มเติมในไฟล์สำคัญ:
- `src/services/LocationService.ts` - อัลกอริทึมประหยัดแบตเตอรี่
- `src/components/MapScreen.tsx` - การจัดการแผนที่และ Live Sharing
- `app.json` - การตั้งค่า Permissions ของ Android

## 🐛 Troubleshooting

### Build Failed (Android)
- ลองรัน `npx expo prebuild --clean --platform android` เพื่อล้างค่า Native Project
- ตรวจสอบ `JAVA_HOME` ว่าชี้ไปที่ JDK 17 หรือ 21
- ตรวจสอบว่ามีไฟล์ `google-services.json` แล้ว

### แผนที่ Google Maps ไม่ขึ้น
- ตรวจสอบ API Key ใน `app.json`
- ตรวจสอบว่าเปิดใช้งาน **Maps SDK for Android** ใน Google Cloud Console แล้ว
- ตรวจสอบ SHA-1 Certificate Fingerprint ว่าตรงกับที่ลงทะเบียนไว้

## 🎯 ขั้นตอนถัดไป

- [x] ✅ โครงสร้างโปรเจ็กต์และแผนที่พื้นฐาน
- [x] ✅ ระบบติดตามตำแหน่งเบื้องหลัง (Background Location)
- [x] ✅ ปุ่มแชร์ตำแหน่งแบบ Live (Semi-realtime)
- [ ] เชื่อมต่อ Firebase Firestore เพื่อส่งข้อมูลจริง
- [ ] สร้าง Web Dashboard สำหรับทีมกู้ภัย
- [ ] เพิ่มระบบ Chat ระหว่างผู้ประสบภัยและเจ้าหน้าที่

## 📄 License

MIT

## 👨‍💻 Author

LifeBeacon Development Team
