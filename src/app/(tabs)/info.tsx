import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';

const Info = () => {
  const { t } = useTranslation('how_it_works');
  return (
    <AnimatedBackground>
      <SafeAreaProvider>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.infoBlockContainer}>
              <LinearGradient
                colors={['#0B1F36', '#102C4C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.subTitle}>
                    {t('intro.title')}
                  </Text>
                  <Text style={styles.text}>
                    {t('intro.description')}
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <Text style={styles.title}>{t('practice_mode.title')}</Text>
            <View style={styles.infoBlockContainer}>
              <LinearGradient
                colors={['#0B1F36', '#102C4C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.subTitle}>
                    {t('practice_mode.subtitle')}
                  </Text>
                  <Text style={styles.text}>
                    {t('practice_mode.description')}
                  </Text>
                  {(t('practice_mode.list', { returnObjects: true }) as string[]).map(
                    (item: string, index: number) => (
                      <Text key={index} style={styles.text}>
                        <Entypo name="dot-single" size={14} color="#fff" />
                        {item}
                      </Text>
                    )
                  )}
                  <Text style={styles.textBold}>Important:</Text>
                  <Text style={styles.text}>
                    {t('practice_mode.important')}
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <Text style={styles.title}>{t('interview_mode.title')}</Text>
            <View style={styles.infoBlockContainer}>
              <LinearGradient
                colors={['#0B1F36', '#102C4C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.subTitle}>
                    {t('interview_mode.subtitle')}
                  </Text>
                  <Text style={styles.text}>
                    {t('interview_mode.description')}
                  </Text>
                  {(t('interview_mode.list', { returnObjects: true }) as string[]).map(
                    (item: string, index: number) => (
                      <Text key={index} style={styles.text}>
                        <Entypo name="dot-single" size={14} color="#fff" />
                        {item}
                      </Text>
                    )
                  )}
                  <Text style={styles.text}>{t('interview_mode.tests')}</Text>
                  {(
                    t('interview_mode.tests_list', {
                      returnObjects: true,
                    }) as string[]
                  ).map((item: string, index: number) => (
                    <Text key={index} style={styles.text}>
                      <Entypo name="dot-single" size={14} color="#fff" />
                      {item}
                    </Text>
                  ))}
                </View>
              </LinearGradient>
            </View>

            <Text style={styles.title}>{t('randomization.title')}</Text>
            <View style={styles.infoBlockContainer}>
              <LinearGradient
                colors={['#0B1F36', '#102C4C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.subTitle}>
                    {t('randomization.subtitle')}
                  </Text>
                  <Text style={styles.text}>
                    {t('randomization.description')}
                  </Text>
                  {(t('randomization.list', { returnObjects: true }) as string[]).map(
                    (item: string, index: number) => (
                      <Text key={index} style={styles.subList}>
                        <Text style={styles.text}>
                          <Entypo name="dot-single" size={14} color="#fff" />
                          {item}
                        </Text>
                      </Text>
                    )
                  )}
                  <Text style={styles.text}>{t('randomization.footer')}</Text>
                </View>
              </LinearGradient>
            </View>

            <Text style={styles.title}>{t('statistics.title')}</Text>
            <View style={[styles.infoBlockContainer, styles.infoBlockPadding]}>
              <LinearGradient
                colors={['#0B1F36', '#102C4C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.subTitle}>
                    {t('statistics.subtitle')}
                  </Text>
                  <Text style={styles.text}>
                    {t('statistics.description')}
                  </Text>
                  {(t('statistics.list', { returnObjects: true }) as string[]).map(
                    (item: string, index: number) => (
                      <Text key={index} style={styles.text}>
                        <Entypo name="dot-single" size={14} color="#fff" />
                        {item}
                      </Text>
                    )
                  )}
                  <Text style={styles.text}>{t('statistics.helps')}</Text>
                  {(
                    t('statistics.helps_list', {
                      returnObjects: true,
                    }) as string[]
                  ).map((item: string, index: number) => (
                    <Text key={index} style={styles.text}>
                      <Entypo name="dot-single" size={14} color="#fff" />
                      {item}
                    </Text>
                  ))}
                </View>
              </LinearGradient>
            </View>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    </AnimatedBackground>
  );
};
export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(20),
  },
  infoBlockContainer: {
    borderWidth: 1,
    borderRadius: s(12),
    overflow: 'hidden',
    borderColor: COLORS.borderColor,
    marginTop: vs(6),
  },
  infoBlockPadding: {
    marginBottom: vs(10),
  },
  innerContainer: {
    padding: s(10),
  },
  title: {
    fontSize: s(18),
    color: COLORS.textPrimary,
    paddingTop: s(10),
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: s(14),
    color: COLORS.textPrimary,
    paddingBottom: s(5),
    fontWeight: 'bold',
  },
  text: {
    fontSize: s(12),
    color: COLORS.textPrimary,
  },
  subList: {
    paddingLeft: s(15),
  },
  textBold: {
    fontSize: s(12),
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    paddingTop: s(5),
  },
});
