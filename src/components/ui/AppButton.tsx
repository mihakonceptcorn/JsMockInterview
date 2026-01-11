import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { COLORS } from '@/theme/colors';

interface AppButtonProps {
  title: string;
  isSecondary?: boolean;
  onPress: () => void;
}
const AppButton: FC<AppButtonProps> = ({
  title,
  isSecondary = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={isSecondary ? styles.buttonSecondary : styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
export default AppButton;
const styles = StyleSheet.create({
  button: {
    padding: 16,
    textAlign: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    width: '50%',
  },
  buttonText: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonSecondary: {
    padding: 16,
    textAlign: 'center',
    backgroundColor: COLORS.bgMiddle,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.borderColor,
    width: '50%',
  },
});
