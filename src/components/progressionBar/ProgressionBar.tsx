import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Bar } from 'react-native-progress';
import { s, vs } from 'react-native-size-matters';

interface ProgressionBarProps {
  title: string;
  progress: number;
}

const ProgressionBar: FC<ProgressionBarProps> = ({ title, progress }) => {
  return (
    <View style={styles.barContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.bar}>
        <Bar progress={progress} width={null} color="#306FB4" />
      </View>
    </View>
  );
};

export default ProgressionBar;

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: s(12),
    color: '#fff',
  },
  bar: {
    marginVertical: vs(8),
  },
});
