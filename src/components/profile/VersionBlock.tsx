import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

import { useTranslation } from 'react-i18next';

const VersionBlock = () => {
  const { t } = useTranslation('profile');
  const version = Constants.expoConfig?.version;
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{t('app_info')}</Text>
        <Text style={styles.text}>
          {t('version')} {version}
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push('/info')} style={styles.btn}>
        <Text style={styles.btnText}>
          {t('how_it_works')}{' '}
          <Feather name="arrow-right" size={12} color={COLORS.accent} />
        </Text>
      </TouchableOpacity>
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
  btn: {
    alignItems: 'center',
    marginTop: vs(10),
  },
  btnText: {
    fontSize: s(12),
    color: COLORS.accent,
  },
});
