import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
import { s } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';

import { useTranslation } from 'react-i18next';

const VersionBlock = () => {
  const { t } = useTranslation('profile');
  const version = Constants.expoConfig?.version;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{t('app_info')}</Text>
        <Text style={styles.text}>
          {t('version')} {version}
        </Text>
      </View>
    </View>
  );
};
export default VersionBlock;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(20),
    paddingVertical: s(10),
  },
  title: {
    fontSize: s(16),
    color: COLORS.textPrimary,
  },
  text: {
    fontSize: s(12),
    color: COLORS.textSecondary,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
