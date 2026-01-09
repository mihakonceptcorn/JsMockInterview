import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';

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
      <Text
        style={isSecondary ? styles.buttonSecondaryText : styles.buttonText}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default AppButton;
const styles = StyleSheet.create({
  button: {
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#306FB4',
    borderRadius: 8,
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonSecondary: {
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    width: '50%',
  },
  buttonSecondaryText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
