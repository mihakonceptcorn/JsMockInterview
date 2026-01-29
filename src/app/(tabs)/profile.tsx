import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import UserData from '@/components/profile/UserData';
import Account from '@/components/profile/Account';
import { COLORS } from '@/theme/colors';
import VersionBlock from '@/components/profile/VersionBlock';
import LanguageSwitcher from '@/components/profile/LanguageSwitcher';
import SkillChart from '@/components/profile/SkillChart';

const Profile = () => {
  return (
    <AnimatedBackground>
      <SafeAreaProvider>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <UserData />
            <Account />
            <View style={styles.separator} />
            <LanguageSwitcher />
            <View style={styles.separator} />
            <SkillChart />
            <View style={styles.separator} />
            <VersionBlock />
          </ScrollView>
        </View>
      </SafeAreaProvider>
    </AnimatedBackground>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.borderColor,
  },
});
