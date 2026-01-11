import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { s } from 'react-native-size-matters';
import AppButton from '@/components/ui/AppButton';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import Feather from '@expo/vector-icons/Feather';
import { COLORS } from '@/theme/colors';

interface StageResultProps {
  onPress: () => void;
  score: number;
  total: number;
}
const StageResult: FC<StageResultProps> = ({ score, total, onPress }) => {
  return (
    <AnimatedBackground>
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Feather
            name="check-circle"
            size={s(60)}
            color={COLORS.success}
            style={styles.glow}
          />
          <Feather name="check-circle" size={s(60)} color={COLORS.success} />
        </View>

        <Text style={styles.title}>StageResult</Text>
        <Text style={styles.title}>
          {score} correct answers from {total} questions
        </Text>
        <AppButton title={'Go To Stages'} onPress={onPress} />
      </View>
    </AnimatedBackground>
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
  iconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    opacity: 0.3,
    transform: [{ scale: 1.2 }],
  },
});
