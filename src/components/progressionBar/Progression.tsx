import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { s, vs } from 'react-native-size-matters';
import ProgressionBar from './ProgressionBar';
import { LinearGradient } from 'expo-linear-gradient';

const Progression = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0B1F36', '#102C4C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View style={styles.gradientInner}>
          <ProgressionBar title="Stages Completed: 4/10" progress={0.4} />
          <ProgressionBar title="Correct Answers: 75%" progress={0.75} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default Progression;

const styles = StyleSheet.create({
  container: {
    height: s(60),
    borderWidth: 1,
    borderRadius: s(12),
    overflow: 'hidden',
    borderColor: '#ccc',
    marginTop: vs(10),
  },
  gradientInner: {
    flexDirection: 'row',
    padding: s(10),
    gap: s(15),
  },
});
