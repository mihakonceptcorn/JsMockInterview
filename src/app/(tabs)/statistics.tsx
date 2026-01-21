import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { FrameworkSwitcher } from '@/components/topTabs/FrameworkSwitcher';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import OverallProgress from '@/components/statistics/OverallProgress';
import MetricsItem from '@/components/statistics/MetricsItem';
import Feather from '@expo/vector-icons/Feather';
import { formatTime } from '@/helpers/formatTime';
import StageStatItem from '@/components/statistics/StageStatItem';

import jsStages from '@/data/js/js.stages.json';
import reactStages from '@/data/react/react.stages.json';

interface StageResult {
  score: number;
  total: number;
  title: string;
  time: number;
}

const Statistics = () => {
  const framework = useSelector((state: RootState) => state.framework.current);
  const results = useSelector((state: RootState) => state.results.current);

  const [stagesCount, setStagesCount] = useState(0);
  const [completedStages, setCompletedStages] = useState(0);
  const [correctAnswersPercentage, setCorrectAnswersPercentage] = useState(0);
  const [totalTimeSeconds, setTotalTimeSeconds] = useState(0);
  const [stages, setStages] = useState<StageResult[]>([]);

  useEffect(() => {
    const currentStages =
      framework === 'js' ? jsStages.stages : reactStages.stages;
    const stageIds = currentStages.map((stage) => stage.id);
    setStagesCount(currentStages.length);

    if (results[framework]) {
      const completed = Object.entries(results[framework]).filter(
        ([id, result]) => stageIds.includes(id) && result.score > 0
      ).length;
      setCompletedStages(completed);

      const totals = Object.entries(results[framework]).reduce(
        (acc, [id, section]) => {
          if (stageIds.includes(id) && section.score > 0) {
            acc.totalScore += section.score;
            acc.totalQuestions += section.total;
            acc.totalTime += section.time;
          }
          return acc;
        },
        { totalScore: 0, totalQuestions: 0, totalTime: 0 }
      );

      const percentage =
        totals.totalQuestions > 0
          ? (totals.totalScore / totals.totalQuestions) * 100
          : 0;

      setCorrectAnswersPercentage(Number(percentage.toFixed(0)));
      setTotalTimeSeconds(totals.totalTime);

      setStages(
        Object.entries(results[framework])
          .filter(([id, section]) => stageIds.includes(id) && section.score > 0)
          .map(([id, section]) => section)
      );
    } else {
      setCompletedStages(0);
      setCorrectAnswersPercentage(0);
      setTotalTimeSeconds(0);
      setStages([]);
    }
  }, [framework, results]);

  return (
    <AnimatedBackground>
      <SafeAreaProvider>
        <View style={styles.container}>
          <FrameworkSwitcher />

          <ScrollView showsVerticalScrollIndicator={false}>
            <OverallProgress
              stagesCount={stagesCount}
              completedStages={completedStages}
            />

            <View style={styles.metrics}>
              <MetricsItem
                data={`${completedStages}/${stagesCount}`}
                title={'Completed'}
                icon={
                  <Feather
                    name="check-circle"
                    size={20}
                    color={COLORS.accent}
                  />
                }
              />

              <MetricsItem
                data={'Time'}
                title={formatTime(totalTimeSeconds)}
                icon={<Feather name="clock" size={20} color={COLORS.accent} />}
              />

              <MetricsItem
                data={`${correctAnswersPercentage}%`}
                title={'Avg Score'}
                icon={<Feather name="star" size={20} color={COLORS.accent} />}
              />
            </View>

            <View style={styles.listContainer}>
              <Text style={styles.title}>Stages</Text>

              {stages.map((item) => (
                <StageStatItem {...item} key={item.title} />
              ))}
            </View>
          </ScrollView>
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
  listContainer: {
    marginTop: vs(14),
    flex: 1,
    paddingBottom: vs(20),
  },
  listContent: {
    paddingBottom: vs(20),
  },
  title: {
    fontSize: s(14),
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginBottom: vs(10),
  },
});
