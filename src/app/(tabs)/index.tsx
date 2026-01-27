import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import Progression from '@/components/progressionBar/Progression';
import SelectStage from '@/components/stages/SelectStage';
import { BackgroundLayout } from '@/components/layout/BackgroundLayout';
import { FrameworkSwitcher } from '@/components/topTabs/FrameworkSwitcher';

import { useEffect } from 'react';
import Purchases from 'react-native-purchases';
import { useDispatch } from 'react-redux';
import { setProStatus } from '@/store/userSlice';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const setup = async () => {
      try {
        Purchases.configure({
          apiKey: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY!,
        });

        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null) {
          const pkg = offerings.current.lifetime;
        }

        const customerInfo = await Purchases.getCustomerInfo();
        if (
          customerInfo.entitlements.active['premium_full_unlock'] !== undefined
        ) {
          dispatch(setProStatus(true));
        } else {
          dispatch(setProStatus(false));
        }
      } catch (e) {
        console.log('RevenueCat error:', e);
      }
    };

    setup();
  }, [dispatch]);

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
