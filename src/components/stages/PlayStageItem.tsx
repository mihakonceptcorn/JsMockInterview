import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

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
};

const PlayStageItem: React.FC<PlayStageItemProps> = ({ item }) => {
  return (
    <View>
      <Text style={styles.question}>Scenario:</Text>

      <Text style={styles.question}>{item.code}</Text>

      <Text style={styles.question}>{item.prompt}</Text>
    </View>
  );
};
export default PlayStageItem;
const styles = StyleSheet.create({
  question: {
    fontSize: 24,
    color: '#fff',
  },
  webview: {
    backgroundColor: '#0d1117',
    opacity: 0.99,
    height: 200,
  },
});
