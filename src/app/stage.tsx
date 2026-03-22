import {
  ActivityIndicator,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { dataMap } from '@/data/dataMap';
import PlayStageItem from '@/components/stages/PlayStageItem';
import ProgressionBar from '@/components/progressionBar/ProgressionBar';
import { s, vs } from 'react-native-size-matters';
import StageResult from '@/components/stages/StageResult';
import { BackgroundLayout } from '@/components/layout/BackgroundLayout';
import { COLORS } from '@/theme/colors';
import { formatTime } from '@/helpers/formatTime';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInAppReview } from '@/hooks/useInAppReview';

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
  const insets = useSafeAreaInsets();
  const { t } = useTranslation(['stage', 'common']);
  const { id, mode, section, title } = useLocalSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isResult, setIsResult] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [time, setTime] = useState(0);
  const [countdown, setCountdown] = useState(30);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const { requestReviewIfNeeded } = useInAppReview();

  useEffect(() => {
    const interactionTask = InteractionManager.runAfterInteractions(() => {
      const key = `${section}/${id}`;
      const loadData = dataMap[key as DataKey];
      const questionsData =
        typeof loadData === 'function' ? loadData() : (loadData as any);

      if (questionsData?.default) {
        const shuffled = [...questionsData.default].sort(
          () => 0.5 - Math.random()
        );
        setQuestions(shuffled.slice(0, 10));
      }
      setIsLoading(false);
    });

    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1000);
    }, 1000);

    return () => {
      interactionTask.cancel();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [id, section]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (mode === 'interview' && !isResult && questions.length > 0) {
      setCountdown(30);

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

  const onBackToHomePressed = () => {
    requestReviewIfNeeded();
    router.replace('/');
  };

  const getCountdownColor = () => {
    if (countdown > 20) return COLORS.success;
    if (countdown > 10) return '#FFD700';
    return COLORS.danger;
  };

  const displayTitle = title?.toString() || 'Result';

  return (
    <BackgroundLayout>
      <View
        style={{
          flex: 1,
          paddingBottom: insets.bottom > 0 ? insets.bottom : vs(20),
        }}
      >
        <Stack.Screen options={{ title: displayTitle }} />

        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color={COLORS.accent} />
          </View>
        ) : (
          questions.length > 0 && (
            <>
              {!isResult ? (
                <>
                  <View style={styles.progressContainer}>
                    <View style={styles.timerContainer}>
                      {mode === 'interview' ? (
                        <>
                          <Text
                            style={[
                              styles.countdownText,
                              { color: getCountdownColor() },
                            ]}
                          >
                            {t('stage:ends_in')}:
                          </Text>
                          <Text
                            style={[
                              styles.countdownText,
                              { color: getCountdownColor() },
                            ]}
                          >
                            {countdown}
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.timerText}>
                          {t('stage:time')}: {formatTime(time)}
                        </Text>
                      )}
                    </View>
                    <ProgressionBar
                      title={`${t('stage:questions')}: ${questionIndex + 1}/${questions.length}`}
                      progress={(questionIndex + 1) / questions.length}
                      barColor={COLORS.textSecondary}
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
                  onPress={onBackToHomePressed}
                />
              )}
            </>
          )
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
    gap: s(10),
  },
  timerContainer: {
    width: '50%',
    alignItems: 'center',
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
