import fs from 'fs';

if (
  process.env.GOOGLE_SERVICES_JSON_BASE64 &&
  process.env.GOOGLE_SERVICES_JSON_BASE64 !== '@GOOGLE_SERVICES_JSON_BASE64'
) {
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
    icon: './assets/jsmi-icon.png',
    backgroundColor: '#10203B',
    userInterfaceStyle: 'dark',
    newArchEnabled: false,
    splash: {
      image: './assets/jsmi-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.mihakonceptcorn.jsmockinterview',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/jsmi-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      googleServicesFile: './google-services.json',
      package: 'com.mihakonceptcorn.jsmockinterview',
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
        'expo-build-properties',
        {
          android: {
            kotlinVersion: '2.0.0',
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            minSdkVersion: 24,
            buildToolsVersion: '35.0.0',
            extraPropertiesGradle: {
              'android.jetpack.compose.version': '1.7.5',
            },
            extraProguardRules:
              '-keep class com.revenuecat.purchases.** { *; }\n-keep class com.revenuecat.purchases.hybridcommon.** { *; }\n-keep class com.google.android.gms.auth.api.** { *; }\n-keep class com.google.android.gms.common.api.** { *; }',
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
