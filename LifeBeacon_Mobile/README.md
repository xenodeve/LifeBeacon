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
1. Copy the example file:
   ```bash
   cp google-services.example.json google-services.json
   ```
2. Open `google-services.json` and replace the placeholder values (`YOUR_PROJECT_NUMBER`, `YOUR_API_KEY`, etc.) with your actual Firebase project details.
   - Alternatively, download the `google-services.json` file from your Firebase Console (Project Settings > General > Your Apps).

### 2. Google Maps API Key
The Google Maps API Key is currently configured in `app.json`. Ensure you have a valid key with the necessary permissions (Maps SDK for Android) enabled in your Google Cloud Console.
