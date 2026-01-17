import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import { FrameworkSwitcher } from '@/components/topTabs/FrameworkSwitcher';
import OverallProgress from '@/components/statistics/OverallProgress';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const FrameworkProgress = () => {
  const framework = useSelector((state: RootState) => state.framework.current);
  const results = useSelector((state: RootState) => state.results.current);

  const [stagesCount, setStagesCount] = useState(0);
  const [completedStages, setCompletedStages] = useState(0);

  useEffect(() => {
    if (framework === 'js') setStagesCount(13);
    if (framework === 'react') setStagesCount(12);

    if (results[framework]) {
      setCompletedStages(Object.keys(results[framework]).length);
    } else {
      setCompletedStages(0);
    }
  }, [framework, results]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FrameworkProgress</Text>
      <FrameworkSwitcher />
      <OverallProgress
        stagesCount={stagesCount}
        completedStages={completedStages}
        marginTop={vs(8)}
      />
    </View>
  );
};
export default FrameworkProgress;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(20),
    paddingVertical: vs(10),
  },
  title: {
    fontSize: s(16),
    color: COLORS.textPrimary,
    paddingBottom: vs(10),
  },
});
