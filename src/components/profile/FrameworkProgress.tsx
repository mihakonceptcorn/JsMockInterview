import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import { FrameworkSwitcher } from '@/components/topTabs/FrameworkSwitcher';
import OverallProgress from '@/components/statistics/OverallProgress';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import jsStages from '@/data/js/js.stages.json';
import reactStages from '@/data/react/react.stages.json';
import reactNativeStages from '@/data/reactNative/reactNative.stages.json';
import vueStages from '@/data/vue/vue.stages.json';

const FrameworkProgress = () => {
  const { t } = useTranslation('profile');
  const router = useRouter();
  const framework = useSelector((state: RootState) => state.framework.current);
  const results = useSelector((state: RootState) => state.results.current);

  const [stagesCount, setStagesCount] = useState(0);
  const [completedStages, setCompletedStages] = useState(0);

  useEffect(() => {
    let currentStages = jsStages.stages;
    switch (framework) {
      case 'react':
        currentStages = reactStages.stages;
        break;
      case 'react-native':
        currentStages = reactNativeStages.stages;
        break;
      case 'vue':
        currentStages = vueStages.stages;
        break;
    }

    const stageIds = currentStages.map((stage) => stage.id);
    setStagesCount(currentStages.length);

    if (results[framework]) {
      const completed = Object.entries(results[framework]).filter(
        ([id, result]) => stageIds.includes(id) && result.score > 0
      ).length;
      setCompletedStages(completed);
    } else {
      setCompletedStages(0);
    }
  }, [framework, results]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('framework_progress')}</Text>
      <FrameworkSwitcher />
      <OverallProgress
        stagesCount={stagesCount}
        completedStages={completedStages}
        marginTop={vs(8)}
      />
      <TouchableOpacity
        onPress={() => router.push('/statistics')}
        style={styles.statsBtn}
      >
        <Text style={styles.statsBtnText}>
          {t('view_statistics')}{' '}
          <Feather name="arrow-right" size={12} color={COLORS.accent} />
        </Text>
      </TouchableOpacity>
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
  statsBtn: {
    alignItems: 'center',
    marginTop: vs(10),
  },
  statsBtnText: {
    fontSize: s(12),
    color: COLORS.accent,
  },
});
