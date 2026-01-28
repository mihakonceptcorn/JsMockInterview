import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { s, vs } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import RadioButton from '../ui/RadioButton';
import { COLORS } from '@/theme/colors';

interface SelectStageItemProps {
  title: string;
  description: string;
  isComplete?: boolean;
  isLocked: boolean;
  onPress: () => void;
  isSelected?: boolean;
  completePercentage?: number;
}

const SelectStageItem: FC<SelectStageItemProps> = ({
  title,
  description,
  isComplete = false,
  isLocked,
  onPress,
  isSelected = false,
  completePercentage = 0,
}) => {
  const { t } = useTranslation('common');
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleContainer}>
        <RadioButton isSelected={isSelected} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text
            style={styles.description}
            numberOfLines={2}
            lineBreakMode="tail"
          >
            {description}
          </Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        {isLocked ? (
          <>
            <FontAwesome name="lock" size={24} color={COLORS.textSecondary} />
            <View>
              <Text
                style={[styles.statusTitle, { color: COLORS.textSecondary }]}
              >
                {t('stage_status.locked')}
              </Text>
            </View>
          </>
        ) : isComplete ? (
          <>
            <FontAwesome name="check-circle" size={24} color={COLORS.success} />
            <View>
              <Text style={styles.statusTitle}>{t('stage_status.completed')}</Text>
              {completePercentage > 0 && (
                <Text style={styles.statusSubTitle}>
                  {t('stage_status.correct')}: {completePercentage}%
                </Text>
              )}
            </View>
          </>
        ) : (
          <>
            <Entypo name="circle-with-cross" size={24} color={COLORS.danger} />
            <Text style={styles.statusTitle}>{t('stage_status.incomplete')}</Text>
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
    flex: 1,
    marginRight: s(10),
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: s(14),
  },
  description: {
    fontSize: s(10),
    color: COLORS.textSecondary,
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
