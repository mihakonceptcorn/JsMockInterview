import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
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
};

const PlayStageItem: React.FC<PlayStageItemProps> = ({
  item,
  onNextPressed,
}) => {
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
    }
  };

  const setNextQuestion = () => {
    onNextPressed(isAnswerCorrect);
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
                <Text style={styles.sectionTitle}>{item.prompt}</Text>
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
                <View style={styles.optionsContainer}>
                  {item.options.map((option, index) => (
                    <SelectOption
                      key={index}
                      title={option}
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
                    <Text style={styles.resultText}>Correct</Text>
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
                      Incorrect
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
                      <Text style={styles.sectionTitle}>Correct:</Text>
                      <Text style={styles.correctAnswerText}>
                        {item.correct.map(
                          (index) => item.options[index] + '; '
                        )}
                      </Text>
                    </View>
                    <View style={styles.explanationContainer}>
                      <Text style={styles.sectionTitle}>Explanation:</Text>
                      <Text style={styles.explanation}>{item.explanation}</Text>
                    </View>
                    <View style={styles.explanationContainer}>
                      <Text style={styles.sectionTitle}>Interview Tip:</Text>
                      <Text style={styles.explanation}>
                        {item.interviewTip}
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
          title={isAnswerShown ? 'Next Question' : 'Check Answer'}
          onPress={isAnswerShown ? setNextQuestion : onCheckAnswer}
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
  },
  prompt: {
    fontSize: s(20),
    color: COLORS.textPrimary,
    paddingVertical: vs(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
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
  },
  explanationContainer: {
    marginTop: vs(10),
  },
  explanation: {
    fontSize: s(12),
    color: COLORS.textPrimary,
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
