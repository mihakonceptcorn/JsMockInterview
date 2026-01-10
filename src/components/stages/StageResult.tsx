import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { s } from 'react-native-size-matters';
import AppButton from '@/components/ui/AppButton';

interface StageResultProps {
  onPress: () => void;
  score: number;
  total: number;
}
const StageResult: FC<StageResultProps> = ({ score, total, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StageResult</Text>
      <Text style={styles.title}>
        {score} correct answers from {total} questions
      </Text>
      <AppButton title={'Go To Stages'} onPress={onPress} />
    </View>
  );
};
export default StageResult;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: s(20),
  },
  title: {
    fontSize: s(24),
    color: '#fff',
  },
});
