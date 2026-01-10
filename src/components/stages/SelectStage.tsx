import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import jsStages from '@/data/js/js.stages.json';
import { s, vs } from 'react-native-size-matters';
import SelectStageItem from './SelectStageItem';
import { useRouter } from 'expo-router';
import AppButton from '@/components/ui/AppButton';

const SelectStage = () => {
  const router = useRouter();
  const [selectedStageId, setSelectedStageId] = useState('');
  const [selectedStageTitle, setSelectedStageTitle] = useState('');

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
          section: 'js',
          title: selectedStageTitle,
        },
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>SelectStage</Text>
        <FlatList
          data={jsStages.stages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SelectStageItem
              title={item.title}
              isSelected={item.id === selectedStageId}
              onPress={() => onSelectStage(item.id, item.title)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
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
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: s(10),
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
    borderTopWidth: 1,
    borderTopColor: '#fff',
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
