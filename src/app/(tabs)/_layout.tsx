import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/theme/colors';
import { s, vs, ms } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';

export default function TabsLayout() {
  const { t } = useTranslation('common');
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.bgBottom,
          height: vs(64),
        },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: {
          fontSize: ms(18),
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: COLORS.bgBottom,
          borderTopWidth: 0,
          height: s(60),
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation.home'),
          headerTitle: t('headers.home'),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="info"
        options={{
          title: t('navigation.how_it_works'),
          headerTitle: t('headers.how_it_works'),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={
                focused ? 'information-circle' : 'information-circle-outline'
              }
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="statistics"
        options={{
          title: t('navigation.statistics'),
          headerTitle: t('headers.statistics'),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: t('navigation.profile'),
          headerTitle: t('headers.profile'),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
