import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import UserData from '@/components/profile/UserData';

const Profile = () => {
  return (
    <AnimatedBackground>
      <SafeAreaProvider>
        <View style={styles.container}>
          <UserData />
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
});
