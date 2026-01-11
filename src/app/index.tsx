import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import TopTabs from '@/components/topTabs/TopTabs';
import Progression from '@/components/progressionBar/Progression';
import SelectStage from '@/components/stages/SelectStage';
import { BackgroundLayout } from '@/components/layout/BackgroundLayout';

export default function App() {
  return (
    <BackgroundLayout>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <TopTabs />

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
