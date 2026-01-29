import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PieChart } from 'react-native-gifted-charts';
import { COLORS } from '@/theme/colors';
import { s, vs } from 'react-native-size-matters';
import jsStages from '@/data/js/js.stages.json';
import reactStages from '@/data/react/react.stages.json';
import reactNativeStages from '@/data/reactNative/reactNative.stages.json';
import vueStages from '@/data/vue/vue.stages.json';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

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

  const skills = [
    { id: 'js', label: 'JS', stages: jsStages.stages, color: '#2E7D32' },
    {
      id: 'react',
      label: 'React',
      stages: reactStages.stages,
      color: '#4CAF50',
    },
    {
      id: 'react-native',
      label: 'RN',
      stages: reactNativeStages.stages,
      color: '#81C784',
    },
    { id: 'vue', label: 'Vue', stages: vueStages.stages, color: '#B9E6B9' },
  ];

  const renderDonut = (skill: (typeof skills)[0]) => {
    const progress = calculateProgress(skill.id, skill.stages);
    const percentage = Math.round(progress * 100);

    const data = [
      { value: percentage, color: skill.color },
      { value: 100 - percentage, color: '#1E293B' },
    ];

    return (
      <View key={skill.id} style={styles.chartItem}>
        <PieChart
          donut
          radius={s(35)}
          innerRadius={s(25)}
          data={data}
          innerCircleColor={COLORS.bgTop}
        />
        <Text style={styles.skillLabel}>{skill.label}</Text>
        <Text style={styles.skillPercent}>{percentage}%</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('skill_proficiency')}</Text>
      <View style={styles.chartsRow}>{skills.map(renderDonut)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(16),
    paddingVertical: vs(10),
  },
  title: {
    fontSize: s(16),
    color: COLORS.textPrimary,
    marginBottom: vs(15),
  },
  chartsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartItem: {
    alignItems: 'center',
  },
  skillLabel: {
    color: COLORS.textSecondary,
    fontSize: s(11),
    marginTop: vs(8),
    fontWeight: '600',
  },
  skillPercent: {
    color: COLORS.textPrimary,
    fontSize: s(10),
    marginTop: vs(2),
  },
});

export default SkillChart;
