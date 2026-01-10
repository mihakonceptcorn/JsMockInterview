import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { s } from 'react-native-size-matters';
import AppButton from '@/components/ui/AppButton';

interface StageResultProps {
  onPress: () => void;
}
const StageResult: FC<StageResultProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StageResult</Text>
      <AppButton title={'Go To Stages'} onPress={onPress} />
    </View>
  );
};
export default StageResult;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: s(24),
    color: '#fff',
  },
});
