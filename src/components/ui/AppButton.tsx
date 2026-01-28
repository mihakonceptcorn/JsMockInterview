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
  isBlocked?: boolean;
  onPress: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
}
const AppButton: FC<AppButtonProps> = ({
  title,
  isSecondary = false,
  isBlocked = false,
  onPress,
  width = '100%',
  height = vs(40),
}) => {
  return (
    <TouchableOpacity
      style={[
        isSecondary ? styles.buttonSecondary : styles.button,
        { width: width, height: height },
        isBlocked ? styles.buttonBlocked : {},
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
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontSize: s(14),
    lineHeight: vs(14),
  },
  buttonSecondary: {
    backgroundColor: COLORS.bgMiddle,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBlocked: {
    opacity: 0.5,
  },
});
