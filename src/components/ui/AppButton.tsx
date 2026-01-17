import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { FC } from 'react';
import { COLORS } from '@/theme/colors';
import { s, vs } from 'react-native-size-matters';

interface AppButtonProps {
  title: string;
  isSecondary?: boolean;
  onPress: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
}
const AppButton: FC<AppButtonProps> = ({
  title,
  isSecondary = false,
  onPress,
  width = '100%',
  height = vs(40),
}) => {
  return (
    <TouchableOpacity
      style={[
        isSecondary ? styles.buttonSecondary : styles.button,
        { width: width, height: height },
      ]}
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
    backgroundColor: COLORS.accent,
    fontSize: s(16),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonSecondary: {
    padding: 14,
    backgroundColor: COLORS.bgMiddle,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: s(16),
  },
});
