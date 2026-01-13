import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { dataMap } from '@/data/dataMap';
import PlayStageItem from '@/components/stages/PlayStageItem';
import ProgressionBar from '@/components/progressionBar/ProgressionBar';
import { s, vs } from 'react-native-size-matters';
import StageResult from '@/components/stages/StageResult';
import { BackgroundLayout } from '@/components/layout/BackgroundLayout';
import { COLORS } from '@/theme/colors';

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
  const [isResult, setIsResult] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stageMode = (mode as string) === 'interview' ? 'interview' : 'practice';

  const router = useRouter();

  useEffect(() => {
    const key = `${section}/${id}`;
    const questionsData = dataMap[key as DataKey] as any;
    const shuffled = [...questionsData.default].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 3) ?? []);
    startTimer();
  }, []);

  const onNextPressed = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      stopTimer();
      setIsResult(true);
    }
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  };

  // const resetTimer = () => {
  //   clearInterval(timerRef.current);
  //   setIsRunning(false);
  //   setTime(0);
  // };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return (
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}`
    );
  };

  return (
    <BackgroundLayout>
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            title: `${title}`,
          }}
        />
        {questions.length > 0 && (
          <>
            {!isResult && (
              <View style={styles.progressContainer}>
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>Time: {formatTime(time)}</Text>
                </View>
                <ProgressionBar
                  title={`Questions: ${questionIndex + 1}/${questions.length}`}
                  progress={Number(
                    ((questionIndex + 1) / questions.length).toFixed(2)
                  )}
                />
              </View>
            )}

            {isResult ? (
              <StageResult
                stageId={id as string}
                score={correctAnswersCount}
                total={questions.length}
                title={title.toString()}
                time={formatTime(time)}
                onPress={() => router.replace('/')}
              />
            ) : (
              <PlayStageItem
                item={questions[questionIndex]}
                mode={stageMode}
                onNextPressed={onNextPressed}
              />
            )}
          </>
        )}
      </View>
    </BackgroundLayout>
  );
};
export default Stage;
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#fff',
  },
  progressContainer: {
    height: s(50),
    paddingHorizontal: s(20),
    marginTop: vs(10),
    flexDirection: 'row',
  },
  timerContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
});
