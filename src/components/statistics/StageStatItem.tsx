import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import { Bar } from 'react-native-progress';
import { formatTime } from '@/helpers/formatTime';
import Feather from '@expo/vector-icons/Feather';

interface StageStatItemProps {
  score: number;
  total: number;
  title: string;
  time: number;
}

const StageStatItem = ({ score, total, title, time }: StageStatItemProps) => {
  const progress = Number(score / total);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0B1F36', '#102C4C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.bar}>
            <Bar
              progress={progress}
              width={null}
              height={6}
              color={
                progress <= 0.4
                  ? COLORS.danger
                  : progress <= 0.7
                    ? COLORS.middleBar
                    : COLORS.success
              }
            />
          </View>
          <View style={[styles.row, styles.gap]}>
            <View style={styles.row}>
              <Feather
                name="check-circle"
                size={16}
                color={COLORS.textPrimary}
              />
              <Text style={styles.info}>
                {score}/{total} correct
              </Text>
            </View>
            <View style={styles.row}>
              <Feather name="clock" size={16} color={COLORS.textPrimary} />
              <Text style={styles.info}>{formatTime(time)}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};
export default StageStatItem;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: s(12),
    overflow: 'hidden',
    borderColor: COLORS.borderColor,
    marginTop: vs(6),
  },
  innerContainer: {
    padding: s(10),
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: s(14),
    fontWeight: '600',
  },
  info: {
    color: COLORS.textSecondary,
    fontSize: s(12),
  },
  bar: {
    marginTop: s(10),
    marginBottom: s(4),
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: s(4),
  },
  gap: {
    gap: s(10),
  },
});
