import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { dataMap } from '@/data/dataMap';
import PlayStageItem from '@/components/stages/PlayStageItem';

type DataKey = keyof typeof dataMap;

interface Question {
  id: string;
  stageId: string;
  type: 'single' | 'multiple';
  prompt: string;
  code?: string;
  options: string[];
  correct: number[];
  explanation: string;
  interviewTip: string;
}

const Stage = () => {
  const { id, mode, section, title } = useLocalSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const key = `${section}/${id}`;
    const questionsData = dataMap[key as DataKey] as any;
    setQuestions(questionsData?.default ?? []);
  }, []);

  return (
    <View>
      <Stack.Screen
        options={{
          title: `${title}`,
        }}
      />
      {questions.length > 0 && <PlayStageItem item={questions[0]} />}
    </View>
  );
};
export default Stage;
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#fff',
  },
});
