import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { dataMap } from '@/data/dataMap';
import PlayStageItem from '@/components/stages/PlayStageItem';
import ProgressionBar from '@/components/progressionBar/ProgressionBar';
import { Bar } from 'react-native-progress';
import { s, vs } from 'react-native-size-matters';

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
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const key = `${section}/${id}`;
    const questionsData = dataMap[key as DataKey] as any;
    setQuestions(questionsData?.default ?? []);
  }, []);

  const onNextPressed = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      console.log('completed!!!');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: `${title}`,
        }}
      />
      {questions.length > 0 && (
        <>
          <View style={styles.progressContainer}>
            <ProgressionBar
              title={`Questions: ${questionIndex + 1}/${questions.length}`}
              progress={Number((questionIndex / questions.length).toFixed(2))}
            />
          </View>

          <PlayStageItem
            item={questions[questionIndex]}
            onNextPressed={onNextPressed}
          />
        </>
      )}
    </View>
  );
};
export default Stage;
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#fff',
  },
  progressContainer: {
    height: 50,
    paddingHorizontal: s(20),
    marginTop: vs(10),
  },
});
