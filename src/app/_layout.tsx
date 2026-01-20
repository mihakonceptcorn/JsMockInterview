import { Stack } from 'expo-router';
import { COLORS } from '@/theme/colors';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout() {
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
