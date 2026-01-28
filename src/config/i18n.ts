import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import homeEn from '../assets/locales/en/home.json';
import howItWorksEn from '../assets/locales/en/how_it_works.json';
import statisticsEn from '../assets/locales/en/statistics.json';
import profileEn from '../assets/locales/en/profile.json';

import homeUk from '../assets/locales/uk/home.json';
import howItWorksUk from '../assets/locales/uk/how_it_works.json';
import statisticsUk from '../assets/locales/uk/statistics.json';
import profileUk from '../assets/locales/uk/profile.json';

const STORAGE_KEY = 'user-language';

const resources = {
  en: {
    home: homeEn,
    how_it_works: howItWorksEn,
    statistics: statisticsEn,
    profile: profileEn,
  },
  uk: {
    home: homeUk,
    how_it_works: howItWorksUk,
    statistics: statisticsUk,
    profile: profileUk,
  },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);

  if (!savedLanguage) {
    // Detect system language
    const locales = Localization.getLocales();
    const systemLanguage = locales[0]?.languageCode || 'en';
    // Support only en and uk, fallback to en
    savedLanguage = ['en', 'uk'].includes(systemLanguage)
      ? systemLanguage
      : 'en';
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage || 'en',
    fallbackLng: 'en',
    ns: ['home', 'how_it_works', 'statistics', 'profile'],
    defaultNS: 'home',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });
};

initI18n();

export const changeLanguage = async (lng: string) => {
  await i18n.changeLanguage(lng);
  await AsyncStorage.setItem(STORAGE_KEY, lng);
};

export default i18n;
