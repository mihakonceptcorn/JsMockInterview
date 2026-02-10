import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '@/theme/colors';

const RadioButton = ({ isSelected = false, isPlayStage = false }) => {
  return (
    <View style={styles.outerCircle}>
      {isSelected && !isPlayStage && <View style={styles.innerCircle} />}
      {isSelected && isPlayStage && (
        <View style={styles.innerCirclePlay}>
          <AntDesign name="check" size={14} color={COLORS.textPrimary} />
        </View>
      )}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  innerCirclePlay: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
