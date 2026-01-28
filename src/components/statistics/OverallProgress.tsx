import { DimensionValue, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Bar } from 'react-native-progress';
import { COLORS } from '@/theme/colors';
import { s, vs } from 'react-native-size-matters';

interface OverallProgressProps {
  stagesCount: number;
  completedStages: number;
  marginTop?: DimensionValue;
}

import { useTranslation } from 'react-i18next';

const OverallProgress = ({
  stagesCount,
  completedStages,
  marginTop = vs(20),
}: OverallProgressProps) => {
  const { t } = useTranslation('common');

  return (
    <View style={[styles.blockContainer, { marginTop: marginTop }]}>
      <LinearGradient
        colors={['#0B1F36', '#102C4C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.progressTitle}>{t('progress.title')}</Text>
          <View style={styles.bar}>
            <Bar
              progress={stagesCount > 0 ? completedStages / stagesCount : 0}
              width={null}
              height={16}
              color={COLORS.accent}
            />
          </View>
          <Text style={styles.progressText}>
            {completedStages}/{stagesCount} {t('progress.stages_completed')}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};
export default OverallProgress;
const styles = StyleSheet.create({
  blockContainer: {
    borderWidth: 1,
    borderRadius: s(12),
    overflow: 'hidden',
    borderColor: COLORS.borderColor,
  },
  blockMarginTop: {
    marginTop: vs(20),
  },
  innerContainer: {
    padding: s(10),
  },
  progressTitle: {
    fontSize: s(14),
    color: COLORS.textPrimary,
  },
  progressText: {
    fontSize: s(10),
    color: COLORS.textSecondary,
  },
  bar: {
    marginTop: s(10),
    marginBottom: s(4),
  },
});
