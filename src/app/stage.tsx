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
import { formatTime } from '@/helpers/formatTime';

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
  const [countdown, setCountdown] = useState(15);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const key = `${section}/${id}`;
    const questionsData = dataMap[key as DataKey] as any;

    if (questionsData?.default) {
      const shuffled = [...questionsData.default].sort(
        () => 0.5 - Math.random()
      );
      setQuestions(shuffled.slice(0, 10));
    }

    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1000);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [id, section]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (mode === 'interview' && !isResult && questions.length > 0) {
      setCountdown(15);

      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onNextPressed(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [questionIndex, mode, isResult, questions.length]);

  const onNextPressed = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsResult(true);
    }
  };

  const getCountdownColor = () => {
    if (countdown > 10) return COLORS.success;
    if (countdown > 5) return '#FFD700';
    return COLORS.danger;
  };

  const displayTitle = title?.toString() || 'Result';

  return (
    <BackgroundLayout>
      <View style={{ flex: 1 }}>
        <Stack.Screen options={{ title: displayTitle }} />

        {questions.length > 0 && (
          <>
            {!isResult ? (
              <>
                <View style={styles.progressContainer}>
                  <View style={styles.timerContainer}>
                    {mode === 'interview' ? (
                      <Text
                        style={[
                          styles.countdownText,
                          { color: getCountdownColor() },
                        ]}
                      >
                        Ends in: {countdown}
                      </Text>
                    ) : (
                      <Text style={styles.timerText}>
                        Time: {formatTime(time)}
                      </Text>
                    )}
                  </View>
                  <ProgressionBar
                    title={`Questions: ${questionIndex + 1}/${questions.length}`}
                    progress={(questionIndex + 1) / questions.length}
                  />
                </View>

                <PlayStageItem
                  item={questions[questionIndex]}
                  mode={mode === 'interview' ? 'interview' : 'practice'}
                  onNextPressed={onNextPressed}
                />
              </>
            ) : (
              <StageResult
                stageId={id as string}
                score={correctAnswersCount}
                total={questions.length}
                title={displayTitle}
                time={time}
                mode={mode as 'practice' | 'interview'}
                onPress={() => router.replace('/')}
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
  countdownText: {
    fontSize: s(14),
    fontWeight: 'bold',
    marginTop: vs(2),
  },
});
