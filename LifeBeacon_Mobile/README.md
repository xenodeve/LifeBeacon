# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Setup for Contributors

This project uses Firebase and Google Maps. To run this project locally, you need to set up the following configuration files:

### 1. Firebase Configuration (Android)

The `google-services.json` file is required for Firebase services but is ignored by git for security.

**Option A: Use the example file**
1. Copy the example file:
   ```bash
   cp google-services.example.json google-services.json
   ```
2. Open `google-services.json` and replace the placeholder values:
   - `YOUR_PROJECT_NUMBER` → Your Firebase project number
   - `YOUR_PROJECT_ID` → Your Firebase project ID
   - `YOUR_STORAGE_BUCKET` → Your storage bucket name
   - `YOUR_MOBILE_SDK_APP_ID` → Your app's SDK ID
   - `YOUR_API_KEY` → Your Firebase API key
   - `com.your.package.name` → `com.lifebeacon.mobile`

**Option B: Download from Firebase Console (Recommended)**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to **Project Settings** > **General**
4. Scroll down to **Your apps** section
5. Click on the Android icon to add an Android app (if not already added)
6. Enter package name: `com.lifebeacon.mobile`
7. Download the `google-services.json` file
8. Place it in the `LifeBeacon_Mobile/` directory

### 2. Google Maps API Key & App Config

The `app.json` file contains sensitive configuration like the Google Maps API Key and is ignored by git.

**Step 1: Get Google Maps API Key**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **Maps SDK for Android**:
   - Go to **APIs & Services** > **Library**
   - Search for "Maps SDK for Android"
   - Click **Enable**
4. Create API Key:
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **API Key**
   - Copy the API key
5. (Optional) Restrict the API key:
   - Click on the created API key
   - Under **Application restrictions**, select **Android apps**
   - Add package name: `com.lifebeacon.mobile`
   - Add your SHA-1 certificate fingerprint (get it with `keytool -list -v -keystore ~/.android/debug.keystore`)

**Step 2: Configure app.json**
1. Copy the example file:
   ```bash
   cp app.example.json app.json
   ```
2. Open `app.json` and replace the following values:
   - `YOUR_GOOGLE_MAPS_API_KEY` → Your Google Maps API key from Step 1
   - `YOUR_EAS_PROJECT_ID` → Your EAS project ID (if using EAS Build, otherwise leave as is)

**Example:**
```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "AIzaSyABCDEFGHIJKLMNOPQRSTUVWXYZ1234567"
        }
      }
    },
    "extra": {
      "eas": {
        "projectId": "12345678-1234-1234-1234-123456789abc"
      }
    }
  }
}
```

