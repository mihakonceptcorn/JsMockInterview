import { Stack } from 'expo-router';
import { COLORS } from '@/theme/colors';

export default function RootLayout() {
  return (
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
    </Stack>
  );
}
