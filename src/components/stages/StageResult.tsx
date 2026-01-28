import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { s, vs } from 'react-native-size-matters';
import AppButton from '@/components/ui/AppButton';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import Feather from '@expo/vector-icons/Feather';
import { COLORS } from '@/theme/colors';
import { Circle } from 'react-native-progress';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatTime } from '@/helpers/formatTime';

import { useDispatch, useSelector } from 'react-redux';
import { setResult } from '@/store/resultsSlice';
import { RootState } from '@/store';

interface StageResultProps {
  onPress: () => void;
  score: number;
  total: number;
  title: string;
  time: number;
  stageId: string;
  mode: 'interview' | 'practice';
}
const StageResult: FC<StageResultProps> = ({
  stageId,
  score,
  total,
  title,
  time,
  mode,
  onPress,
}) => {
  const { t } = useTranslation('stage');
  const dispatch = useDispatch();

  const framework = useSelector((state: RootState) => state.framework.current);

  useEffect(() => {
    if (mode === 'interview') {
      dispatch(
        setResult({
          framework,
          stageId,
          score,
          total,
          title,
          time,
        })
      );
    }
  }, [dispatch, framework, stageId, score, total, title, time]);

  const getScore = Math.round((score / total) * 100) + '%';

  return (
    <AnimatedBackground>
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Feather
            name="check-circle"
            size={s(60)}
            color={COLORS.success}
            style={styles.glow}
          />
          <Feather name="check-circle" size={s(60)} color={COLORS.success} />
        </View>

        <Text style={styles.title}>{t('results.title')}!</Text>
        <Text style={styles.titleSecondary}>{title}</Text>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>
            {t('results.recap_title')}:
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.row}>
              <Circle
                size={60}
                indeterminate={false}
                progress={score / total}
                color={COLORS.success}
                unfilledColor={COLORS.successTransparent}
                showsText={true}
                formatText={() => `${score}/${total}`}
                textStyle={{ fontSize: s(14), fontWeight: 'bold' }}
                thickness={s(6)}
              />
              <View>
                <Text style={styles.score}>
                  {t('results.score')}: <Text style={styles.scoreValue}>{getScore}</Text>
                </Text>
                <Text style={styles.time}>{t('results.time')}: {formatTime(time)}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.recapTitle}>{t('results.recap_header')}</Text>
          <View style={styles.recapInner}>
            <Ionicons name="sunny" size={40} color="yellow" />
            <Text style={styles.recapText}>
              {t('results.recap_message')}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <AppButton title={t('results.back_to_home')} onPress={onPress} />
        </View>
      </View>
    </AnimatedBackground>
  );
};
export default StageResult;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: s(20),
  },
  title: {
    fontSize: s(24),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: vs(20),
  },
  titleSecondary: {
    fontSize: s(18),
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  iconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(40),
  },
  glow: {
    position: 'absolute',
    opacity: 0.3,
    transform: [{ scale: 1.2 }],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(16),
  },
  statsContainer: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: vs(10),
    marginTop: vs(10),
    padding: s(10),
    width: '100%',
  },
  statsTitle: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: s(14),
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    marginVertical: vs(30),
  },
  score: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: s(16),
  },
  scoreValue: {
    color: COLORS.success,
  },
  time: {
    color: COLORS.textPrimary,
    fontSize: s(14),
  },
  recapTitle: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: s(14),
    marginTop: s(10),
  },
  recapText: {
    color: COLORS.textPrimary,
    fontSize: s(12),
    paddingStart: s(10),
    flex: 1,
  },
  recapInner: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: s(10),
  },
});
