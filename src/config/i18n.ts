import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import homeEn from '../assets/locales/en/home.json';
import howItWorksEn from '../assets/locales/en/how_it_works.json';
import statisticsEn from '../assets/locales/en/statistics.json';
import profileEn from '../assets/locales/en/profile.json';
import commonEn from '../assets/locales/en/common.json';
import authEn from '../assets/locales/en/auth.json';
import stageEn from '../assets/locales/en/stage.json';

import homeUk from '../assets/locales/uk/home.json';
import howItWorksUk from '../assets/locales/uk/how_it_works.json';
import statisticsUk from '../assets/locales/uk/statistics.json';
import profileUk from '../assets/locales/uk/profile.json';
import commonUk from '../assets/locales/uk/common.json';
import authUk from '../assets/locales/uk/auth.json';
import stageUk from '../assets/locales/uk/stage.json';

import homeEs from '../assets/locales/es/home.json';
import howItWorksEs from '../assets/locales/es/how_it_works.json';
import statisticsEs from '../assets/locales/es/statistics.json';
import profileEs from '../assets/locales/es/profile.json';
import commonEs from '../assets/locales/es/common.json';
import authEs from '../assets/locales/es/auth.json';
import stageEs from '../assets/locales/es/stage.json';

const STORAGE_KEY = 'user-language';

const resources = {
  en: {
    home: homeEn,
    how_it_works: howItWorksEn,
    statistics: statisticsEn,
    profile: profileEn,
    common: commonEn,
    auth: authEn,
    stage: stageEn,
  },
  uk: {
    home: homeUk,
    how_it_works: howItWorksUk,
    statistics: statisticsUk,
    profile: profileUk,
    common: commonUk,
    auth: authUk,
    stage: stageUk,
  },
  es: {
    home: homeEs,
    how_it_works: howItWorksEs,
    statistics: statisticsEs,
    profile: profileEs,
    common: commonEs,
    auth: authEs,
    stage: stageEs,
  },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);

  if (!savedLanguage) {
    const locales = Localization.getLocales();
    const systemLanguage = locales[0]?.languageCode || 'en';

    savedLanguage = ['en', 'uk'].includes(systemLanguage)
      ? systemLanguage
      : 'en';
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage || 'en',
    fallbackLng: 'en',
    ns: [
      'home',
      'how_it_works',
      'statistics',
      'profile',
      'common',
      'auth',
      'stage',
    ],
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
