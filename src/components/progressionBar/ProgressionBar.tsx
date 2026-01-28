import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Bar } from 'react-native-progress';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';

interface ProgressionBarProps {
  title: string;
  progress: number;
}

const ProgressionBar: FC<ProgressionBarProps> = ({ title, progress }) => {
  return (
    <View style={styles.barContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.bar}>
        <Bar
          progress={progress}
          width={null}
          height={vs(8)}
          color={COLORS.success}
        />
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
    fontSize: s(11),
    color: '#fff',
    fontWeight: 'bold',
  },
  bar: {
    marginVertical: vs(8),
  },
});
