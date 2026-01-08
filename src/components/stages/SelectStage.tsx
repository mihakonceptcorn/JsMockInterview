import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import jsStages from '@/data/js/js.stages.json';
import { s, vs } from 'react-native-size-matters';
import SelectStageItem from './SelectStageItem';
import { useRouter } from 'expo-router';

const SelectStage = () => {
  const router = useRouter();
  const [selectedStageId, setSelectedStageId] = useState('');

  const onSelectStage = (id: string) => {
    setSelectedStageId(id);
  };

  const onPracticeMode = () => {
    if (selectedStageId) {
      router.push({
        pathname: 'stage',
        params: { id: selectedStageId },
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
              onPress={() => onSelectStage(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Interview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={onPracticeMode}>
          <Text style={styles.buttonSecondaryText}>Practice Mode</Text>
        </TouchableOpacity>
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
  },
  actions: {
    gap: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: s(20),
  },
  button: {
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 8,
    width: '50%',
  },
  buttonSecondary: {
    padding: 16,
    textAlign: 'center',
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
