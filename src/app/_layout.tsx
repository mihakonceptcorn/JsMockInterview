import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { COLORS } from '@/theme/colors';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { AuthProvider } from '@/context/AuthContext';
import { FontAwesome, Ionicons, Feather, Entypo } from '@expo/vector-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function RootLayout() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const [loaded, error] = useFonts({
    ...FontAwesome.font,
    ...Ionicons.font,
    ...Feather.font,
    ...Entypo.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="stage"
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.bgBottom,
                },
                headerTintColor: COLORS.textPrimary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="signUp"
              options={{
                headerShown: true,
                headerTitle: '',
                headerStyle: {
                  backgroundColor: COLORS.bgBottom,
                },
                headerTintColor: COLORS.textPrimary,
              }}
            />
            <Stack.Screen
              name="logIn"
              options={{
                headerShown: true,
                headerTitle: '',
                headerStyle: {
                  backgroundColor: COLORS.bgBottom,
                },
                headerTintColor: COLORS.textPrimary,
              }}
            />
          </Stack>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
}
