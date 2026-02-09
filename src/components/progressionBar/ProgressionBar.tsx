import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Bar } from 'react-native-progress';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';

interface ProgressionBarProps {
  title: string;
  progress: number;
  isColor?: boolean;
  barColor?: string;
}

const ProgressionBar: FC<ProgressionBarProps> = ({
  title,
  progress,
  isColor = false,
  barColor = COLORS.success,
}) => {
  let color = barColor;

  if (isColor) {
    color =
      progress <= 0.4
        ? COLORS.danger
        : progress <= 0.7
          ? COLORS.middleBar
          : COLORS.success;
  }

  return (
    <View style={styles.barContainer}>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.5}
        style={styles.title}
      >
        {title}
      </Text>
      <View style={styles.bar}>
        <Bar progress={progress} width={null} height={vs(8)} color={color} />
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
