import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { FrameworkSwitcher } from '@/components/topTabs/FrameworkSwitcher';
import { s, vs } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/theme/colors';
import { Bar } from 'react-native-progress';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import OverallProgress from '@/components/statistics/OverallProgress';
import MetricsItem from '@/components/statistics/MetricsItem';
import Feather from '@expo/vector-icons/Feather';

const Statistics = () => {
  const framework = useSelector((state: RootState) => state.framework.current);
  const results = useSelector((state: RootState) => state.results.current);

  const [stagesCount, setStagesCount] = useState(0);
  const [completedStages, setCompletedStages] = useState(0);
  const [correctAnswersPercentage, setCorrectAnswersPercentage] = useState(0);

  useEffect(() => {
    if (framework === 'js') setStagesCount(13);
    if (framework === 'react') setStagesCount(12);

    if (results[framework]) {
      setCompletedStages(Object.keys(results[framework]).length);

      const totals = Object.values(results[framework]).reduce(
        (acc, section) => {
          acc.totalScore += section.score;
          acc.totalQuestions += section.total;
          return acc;
        },
        { totalScore: 0, totalQuestions: 0 }
      );

      const percentage =
        totals.totalQuestions > 0
          ? (totals.totalScore / totals.totalQuestions) * 100
          : 0;
      setCorrectAnswersPercentage(Number(percentage.toFixed(0)));
    } else {
      setCompletedStages(0);
      setCorrectAnswersPercentage(0);
    }
  }, [framework, results]);

  return (
    <AnimatedBackground>
      <SafeAreaProvider>
        <View style={styles.container}>
          <FrameworkSwitcher />

          <OverallProgress
            stagesCount={stagesCount}
            completedStages={completedStages}
          />

          <View style={styles.metrics}>
            <MetricsItem
              data={`${completedStages}/${stagesCount}`}
              title={'Completed'}
              icon={
                <Feather name="check-circle" size={20} color={COLORS.accent} />
              }
            />

            <MetricsItem
              data={'data'}
              title={'Total Time'}
              icon={<Feather name="clock" size={20} color={COLORS.accent} />}
            />

            <MetricsItem
              data={`${correctAnswersPercentage}%`}
              title={'Avg Score'}
              icon={<Feather name="star" size={20} color={COLORS.accent} />}
            />
          </View>
        </View>
      </SafeAreaProvider>
    </AnimatedBackground>
  );
};
export default Statistics;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop: s(20),
  },
  blockContainer: {
    borderWidth: 1,
    borderRadius: s(12),
    overflow: 'hidden',
    borderColor: COLORS.borderColor,
    marginTop: vs(6),
  },
  flexOne: {
    flex: 1,
  },
  blockMarginTop: {
    marginTop: vs(20),
  },
  innerContainer: {
    padding: s(10),
  },
  metrics: {
    flexDirection: 'row',
    gap: s(5),
  },
  progressText: {
    fontSize: s(10),
    color: COLORS.textSecondary,
  },
});
