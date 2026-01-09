import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import RadioButton from '@/components/ui/RadioButton';
import { vs } from 'react-native-size-matters';

interface SelectOptionProps {
  title: string;
  isSelected?: boolean;
  onPress: () => void;
}

const SelectOption: FC<SelectOptionProps> = ({
  isSelected,
  onPress,
  title,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleContainer}>
        <RadioButton isSelected={isSelected} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default SelectOption;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: vs(10),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
  },
  index: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
