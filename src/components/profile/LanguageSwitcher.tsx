import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/config/i18n';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation('profile');
  const currentLanguage = i18n.language;

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'uk', label: 'Українська' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('language')}</Text>
      <View style={styles.blockContainer}>
        <LinearGradient
          colors={['#0B1F36', '#102C4C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.innerContainer}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.langOption,
                  currentLanguage === lang.code && styles.activeOption,
                ]}
                onPress={() => changeLanguage(lang.code)}
              >
                <Text
                  style={[
                    styles.langText,
                    currentLanguage === lang.code && styles.activeText,
                  ]}
                >
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default LanguageSwitcher;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(20),
    paddingVertical: vs(10),
  },
  title: {
    fontSize: s(16),
    color: COLORS.textPrimary,
  },
  blockContainer: {
    borderWidth: 1,
    borderRadius: s(12),
    overflow: 'hidden',
    borderColor: COLORS.borderColor,
    marginTop: vs(6),
  },
  innerContainer: {
    padding: s(4),
    flexDirection: 'row',
    gap: s(4),
  },
  langOption: {
    flex: 1,
    paddingVertical: vs(8),
    alignItems: 'center',
    borderRadius: s(8),
  },
  activeOption: {
    backgroundColor: COLORS.accent,
  },
  langText: {
    fontSize: s(12),
    color: COLORS.textPrimary,
  },
  activeText: {
    fontWeight: 'bold',
  },
});
