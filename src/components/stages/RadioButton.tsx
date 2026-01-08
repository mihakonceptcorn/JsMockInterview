import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RadioButton = ({ isSelected = false }) => {
  return (
    <View style={styles.outerCircle}>{isSelected && <View style={styles.innerCircle} />}</View>
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
});
