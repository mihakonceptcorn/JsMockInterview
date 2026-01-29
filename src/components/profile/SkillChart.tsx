import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ProgressChart } from 'react-native-chart-kit';
import { COLORS } from '@/theme/colors';
import { s, vs } from 'react-native-size-matters';
import jsStages from '@/data/js/js.stages.json';
import reactStages from '@/data/react/react.stages.json';
import reactNativeStages from '@/data/reactNative/reactNative.stages.json';
import vueStages from '@/data/vue/vue.stages.json';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const screenWidth = Dimensions.get('window').width;

const SkillChart = () => {
  const { t } = useTranslation('profile');
  const results = useSelector((state: RootState) => state.results.current);

  const calculateProgress = (
    framework: string,
    stages: { id: string }[]
  ): number => {
    if (!results[framework]) return 0;

    const stageIds = stages.map((s) => s.id);
    const resultsArray = Object.entries(results[framework]).filter(([id]) =>
      stageIds.includes(id)
    );

    const completedCount = resultsArray.filter(
      ([_, result]) => result.score > 0
    ).length;

    const totals = resultsArray.reduce(
      (acc, [_, result]) => {
        if (result.score > 0) {
          acc.score += result.score;
          acc.total += result.total;
        }
        return acc;
      },
      { score: 0, total: 0 }
    );

    const precision = totals.total > 0 ? totals.score / totals.total : 0;
    const coverage = stages.length > 0 ? completedCount / stages.length : 0;

    return precision * coverage;
  };

  const data = {
    labels: ['JS', 'React', 'RN', 'Vue'],
    data: [
      calculateProgress('js', jsStages.stages),
      calculateProgress('react', reactStages.stages),
      calculateProgress('react-native', reactNativeStages.stages),
      calculateProgress('vue', vueStages.stages),
    ],
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1, index: any) => {
      const shades = [
        `rgba(46, 125, 50, ${opacity})`, // JS
        `rgba(76, 175, 80, ${opacity})`, // React
        `rgba(129, 199, 132, ${opacity})`, // React Native
        `rgba(185, 230, 185, ${opacity})`, // Vue
      ];

      return index !== undefined
        ? shades[index]
        : `rgba(76, 175, 80, ${opacity})`;
    },
    labelColor: () => COLORS.textSecondary,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('skill_proficiency')}</Text>
      <ProgressChart
        data={data}
        width={s(screenWidth - 120)}
        height={vs(160)}
        strokeWidth={s(12)}
        radius={s(28)}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  );
};
export default SkillChart;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(20),
    paddingVertical: vs(10),
  },
  title: {
    fontSize: s(16),
    color: COLORS.textPrimary,
  },
});
