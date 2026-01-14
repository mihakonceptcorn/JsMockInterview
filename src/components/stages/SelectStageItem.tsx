import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { s, vs } from 'react-native-size-matters';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import RadioButton from '../ui/RadioButton';
import { COLORS } from '@/theme/colors';

interface SelectStageItemProps {
  title: string;
  isComplete?: boolean;
  onPress: () => void;
  isSelected?: boolean;
  completePercentage?: number;
}

const SelectStageItem: FC<SelectStageItemProps> = ({
  title,
  isComplete = false,
  onPress,
  isSelected = false,
  completePercentage = 0,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleContainer}>
        <RadioButton isSelected={isSelected} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.statusContainer}>
        {isComplete ? (
          <>
            <FontAwesome name="check-circle" size={24} color="green" />
            <View>
              <Text style={styles.statusTitle}>Completed</Text>
              {completePercentage > 0 && (
                <Text style={styles.statusSubTitle}>
                  Correct: {completePercentage}%
                </Text>
              )}
            </View>
          </>
        ) : (
          <>
            <Entypo name="circle-with-cross" size={24} color="#8f0303" />
            <Text style={styles.statusTitle}>Incomplete</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SelectStageItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
    paddingVertical: vs(10),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTitle: {
    marginLeft: s(6),
    color: COLORS.textSecondary,
    fontSize: s(12),
  },
  statusSubTitle: {
    fontSize: s(10),
    marginLeft: s(6),
    color: COLORS.accent,
  },
});
