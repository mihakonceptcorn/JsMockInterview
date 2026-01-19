import { Stack } from 'expo-router';
import { COLORS } from '@/theme/colors';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';

export default function RootLayout() {
  return (
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
          <Stack.Screen name="auth" />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
