import fs from 'fs';

if (process.env.GOOGLE_SERVICES_JSON_BASE64) {
  fs.writeFileSync(
    './google-services.json',
    Buffer.from(process.env.GOOGLE_SERVICES_JSON_BASE64, 'base64').toString(
      'utf-8'
    )
  );
}

export default {
  expo: {
    name: 'JS Mock Interview',
    slug: 'js-mock-interview',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    backgroundColor: '#10203B',
    userInterfaceStyle: 'dark',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.mihakonceptcorn.jsmockinterview',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      googleServicesFile: './google-services.json',
      package: 'com.mihakonceptcorn.jsmockinterview',
      // permissions: ['android.permission.INTERNET'],
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-asset',
      'expo-font',
      'expo-file-system',
      '@react-native-google-signin/google-signin',
      [
        'react-native-iap',
        {
          paymentStore: 'google',
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            kotlinVersion: '1.9.22',
          },
        },
      ],
    ],
    extra: {
      router: {},
      eas: {
        projectId: '2ac18649-d716-4ff9-af10-e7c1ec8014c8',
      },
    },
  },
};
