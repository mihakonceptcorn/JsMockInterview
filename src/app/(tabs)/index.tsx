import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import Progression from '@/components/progressionBar/Progression';
import SelectStage from '@/components/stages/SelectStage';
import { BackgroundLayout } from '@/components/layout/BackgroundLayout';
import { FrameworkSwitcher } from '@/components/topTabs/FrameworkSwitcher';

import { useEffect } from 'react';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

export default function App() {
  useEffect(() => {
    const setup = async () => {
      try {
        Purchases.configure({
          apiKey: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY!,
        });

        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null) {
          console.log('Доступний пакет:', offerings.current.availablePackages);
          console.log(
            'Ціна:',
            offerings.current.availablePackages[0].product.priceString
          );
        }
      } catch (e) {
        console.log('Помилка RevenueCat:', e);
      }
    };

    setup();
  }, []);

  return (
    <BackgroundLayout>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <FrameworkSwitcher />
          <Progression />
          <SelectStage />
        </SafeAreaView>
      </SafeAreaProvider>
    </BackgroundLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
