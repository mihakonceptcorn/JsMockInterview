import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import jsStages from '@/data/js/js.stages.json';
import reactStages from '@/data/react/react.stages.json';
import { s, vs } from 'react-native-size-matters';
import SelectStageItem from './SelectStageItem';
import { useRouter } from 'expo-router';
import AppButton from '@/components/ui/AppButton';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/theme/colors';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const SelectStage = () => {
  const router = useRouter();
  const [selectedStageId, setSelectedStageId] = useState('');
  const [selectedStageTitle, setSelectedStageTitle] = useState('');

  let stagesData = jsStages;

  const results = useSelector((state: RootState) => state.results.current);

  const framework = useSelector((state: RootState) => state.framework.current);
  if (framework === 'react') stagesData = reactStages;

  const onSelectStage = (id: string, name: string) => {
    setSelectedStageId(id);
    setSelectedStageTitle(name);
  };

  const onStartStage = (mode: 'practice' | 'interview') => {
    if (selectedStageId) {
      router.push({
        pathname: '/stage',
        params: {
          id: selectedStageId,
          mode: mode,
          section: framework,
          title: selectedStageTitle,
        },
      });
    }
  };

  const isStageCompleted = (stageId: string) => {
    return results[framework]?.[stageId]?.score > 0;
  };

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={['#0B1F36', '#102C4C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.flex}
        >
          <View style={[styles.gradientInner, styles.flex]}>
            <Text style={styles.title}>SelectStage</Text>
            <FlatList
              data={stagesData.stages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SelectStageItem
                  title={item.title}
                  isSelected={item.id === selectedStageId}
                  isComplete={isStageCompleted(item.id)}
                  onPress={() => onSelectStage(item.id, item.title)}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.actions}>
        <AppButton
          title={'Start Interview'}
          onPress={() => onStartStage('interview')}
        />
        <AppButton
          title={'Practice Mode'}
          onPress={() => onStartStage('practice')}
          isSecondary
        />
      </View>
    </>
  );
};

export default SelectStage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: s(20),
    borderWidth: 1,
    borderRadius: s(12),
    overflow: 'hidden',
    borderColor: COLORS.borderColor,
  },
  flex: {
    flex: 1,
  },
  gradientInner: {
    padding: s(10),
  },
  title: {
    fontSize: s(16),
    fontWeight: 'bold',
    marginVertical: vs(12),
    color: '#fff',
  },
  actions: {
    gap: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: s(20),
  },
  button: {
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#306FB4',
    borderRadius: 8,
    width: '50%',
  },
  buttonSecondary: {
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonSecondaryText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
