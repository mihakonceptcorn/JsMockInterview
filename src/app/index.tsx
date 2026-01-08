import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import TopTabs from '@/components/topTabs/TopTabs';
import Progression from '@/components/progressionBar/Progression';
import SelectStage from '@/components/stages/SelectStage';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TopTabs />

        <Progression />

        <SelectStage />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
