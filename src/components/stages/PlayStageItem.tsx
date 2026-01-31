import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CodeHighlighter from 'react-native-code-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { s, vs } from 'react-native-size-matters';
import SelectOption from '@/components/stages/SelectOption';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import AppButton from '@/components/ui/AppButton';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/theme/colors';

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

type PlayStageItemProps = {
  item: Question;
  onNextPressed: (isAnswerCorrect: boolean) => void;
  mode: 'practice' | 'interview';
};

const PlayStageItem: React.FC<PlayStageItemProps> = ({
  item,
  mode,
  onNextPressed,
}) => {
  const { t } = useTranslation(['questions', 'stage']);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const onSelectOption = (index: number) => {
    setSelectedOptions((prev) => {
      if (prev.includes(index)) {
        return prev.filter((option) => option !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const onCheckAnswer = () => {
    if (selectedOptions.length) {
      setIsAnswerShown(true);

      let result = false;
      const a = item.correct;
      const b = selectedOptions;

      if (a.length !== b.length) {
        result = false;
      } else {
        const sA = [...a].sort((x, y) => x - y);
        const sB = [...b].sort((x, y) => x - y);
        result = sA.every((val, index) => val === sB[index]);
      }

      setIsAnswerCorrect(result);

      return result;
    }
    return false;
  };

  const setNextQuestion = () => {
    if (mode === 'interview') {
      if (!selectedOptions.length) return;
      const result = onCheckAnswer();
      onNextPressed(result);
    } else {
      onNextPressed(isAnswerCorrect);
    }

    setSelectedOptions([]);
    setIsAnswerShown(false);
    setIsAnswerCorrect(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.questionContainer}>
            <LinearGradient
              colors={['#0B1F36', '#102C4C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.gradientInner}>
                <Text style={styles.sectionTitle}>
                  {t(`${item.id}.prompt`)}
                </Text>
                <View style={styles.codeContainerWrapper}>
                  {item.code && (
                    <CodeHighlighter
                      hljsStyle={a11yDark}
                      containerStyle={styles.codeContainerStyle}
                      language="JavaScript"
                    >
                      {item.code}
                    </CodeHighlighter>
                  )}
                </View>
                <Text style={styles.questionType}>
                  {item.type === 'single'
                    ? t('stage:play.choose_single')
                    : t('stage:play.choose_multiple')}
                </Text>
                <View style={styles.optionsContainer}>
                  {item.options.map((option, index) => (
                    <SelectOption
                      key={index}
                      title={t(`${item.id}.options.${index}`)}
                      isSelected={selectedOptions.includes(index)}
                      onPress={() => {
                        onSelectOption(index);
                      }}
                    />
                  ))}
                </View>
              </View>
            </LinearGradient>
          </View>

          {isAnswerShown && (
            <>
              {isAnswerCorrect && (
                <>
                  <View style={styles.resultContainer}>
                    <FontAwesome name="check-circle" size={24} color="green" />
                    <Text style={styles.resultText}>
                      {t('stage:play.correct')}
                    </Text>
                  </View>
                </>
              )}

              {!isAnswerCorrect && (
                <>
                  <View style={styles.resultContainer}>
                    <Entypo
                      name="circle-with-cross"
                      size={24}
                      color={COLORS.danger}
                    />
                    <Text
                      style={[styles.resultText, styles.resultTextIncorrect]}
                    >
                      {t('stage:play.incorrect')}
                    </Text>
                  </View>
                </>
              )}

              <View style={[styles.questionContainer, styles.bottomMargin]}>
                <LinearGradient
                  colors={['#0B1F36', '#102C4C']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.gradientInner}>
                    <View style={styles.correctAnswerContainer}>
                      <Text style={styles.sectionTitle}>
                        {t('stage:play.correct_label')}
                      </Text>
                      <Text style={styles.correctAnswerText}>
                        {item.correct
                          .map((index) => t(`${item.id}.options.${index}`))
                          .join('; ')}
                      </Text>
                    </View>
                    <View style={styles.explanationContainer}>
                      <Text style={styles.sectionTitle}>
                        {t('stage:play.explanation_label')}
                      </Text>
                      <Text style={styles.explanation}>
                        {t(`${item.id}.explanation`)}
                      </Text>
                    </View>
                    <View style={styles.explanationContainer}>
                      <Text style={styles.sectionTitle}>
                        {t('stage:play.interview_tip_label')}
                      </Text>
                      <Text style={styles.explanation}>
                        {t(`${item.id}.interviewTip`)}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </>
          )}
        </ScrollView>
      </View>

      <View style={styles.actions}>
        <AppButton
          title={
            isAnswerShown || mode === 'interview'
              ? t('stage:play.next_question')
              : t('stage:play.check_answer')
          }
          onPress={
            isAnswerShown || mode === 'interview'
              ? setNextQuestion
              : onCheckAnswer
          }
        />
      </View>
    </View>
  );
};
export default PlayStageItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(20),
  },
  sectionTitle: {
    fontSize: s(16),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: vs(10),
  },
  codeContainerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: s(12),
    overflow: 'hidden',
    marginBottom: vs(10),
  },
  codeContainerStyle: {
    padding: s(16),
    minWidth: '100%',
    backgroundColor: COLORS.bgTop,
    flexShrink: 1,
  },
  prompt: {
    fontSize: s(20),
    color: COLORS.textPrimary,
    paddingVertical: vs(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  questionType: {
    color: COLORS.textSecondary,
    fontSize: s(12),
  },
  questionContainer: {
    borderWidth: 1,
    borderRadius: s(12),
    overflow: 'hidden',
    borderColor: COLORS.borderColor,
    marginTop: vs(10),
  },
  bottomMargin: {
    marginBottom: vs(20),
  },
  optionsContainer: {
    borderBottomColor: COLORS.borderColor,
  },
  gradientInner: {
    padding: s(10),
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(10),
  },
  resultText: {
    fontSize: s(16),
    color: COLORS.textPrimary,
    marginLeft: s(10),
  },
  resultTextIncorrect: {
    color: COLORS.danger,
  },
  correctAnswerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
    paddingBottom: vs(10),
  },
  correctAnswerTitle: {
    fontSize: s(16),
    color: COLORS.textPrimary,
    marginRight: s(10),
  },
  correctAnswerText: {
    fontSize: s(12),
    color: COLORS.textPrimary,
    flexShrink: 1,
  },
  explanationContainer: {
    marginTop: vs(10),
  },
  explanation: {
    fontSize: s(12),
    color: COLORS.textPrimary,
    flexShrink: 1,
  },
  actions: {
    alignItems: 'center',
    paddingVertical: vs(20),
    marginBottom: vs(10),
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
  },
  scrollContainer: {
    flex: 1,
  },
});
