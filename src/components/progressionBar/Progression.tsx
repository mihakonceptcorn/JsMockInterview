import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { s, vs } from 'react-native-size-matters';
import ProgressionBar from './ProgressionBar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/theme/colors';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Progression = () => {
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
      setCorrectAnswersPercentage(percentage);
    } else {
      setCompletedStages(0);
      setCorrectAnswersPercentage(0);
    }
  }, [framework, results]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0B1F36', '#102C4C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View style={styles.gradientInner}>
          <ProgressionBar
            title={`Stages Completed: ${completedStages}/${stagesCount}`}
            progress={stagesCount > 0 ? completedStages / stagesCount : 0}
          />
          <ProgressionBar
            title={`Correct Answers: ${correctAnswersPercentage.toFixed(0)}%`}
            progress={correctAnswersPercentage / 100}
          />
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
    borderColor: COLORS.borderColor,
    marginTop: vs(20),
  },
  gradientInner: {
    flexDirection: 'row',
    padding: s(10),
    gap: s(15),
  },
});
