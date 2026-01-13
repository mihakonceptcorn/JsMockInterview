import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';

const Statistics = () => {
  return (
    <AnimatedBackground>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Text style={{ fontSize: 30, color: 'white' }}>Statistics</Text>
        </View>
      </SafeAreaProvider>
    </AnimatedBackground>
  );
};
export default Statistics;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
