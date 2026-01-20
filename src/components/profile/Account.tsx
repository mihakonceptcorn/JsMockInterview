import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import AppButton from '@/components/ui/AppButton';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const Account = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const showConfirmDialog = () => {
    Alert.alert('Are you sure?', 'Do you really want to logOut?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'LogOut',
        onPress: () => logout(),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.blockContainer}>
        <LinearGradient
          colors={['#0B1F36', '#102C4C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.innerContainer}>
            {user ? (
              <>
                <AppButton
                  title="LogOut"
                  onPress={showConfirmDialog}
                  height={vs(30)}
                />
              </>
            ) : (
              <>
                <View style={{ width: '65%' }}>
                  <Text style={styles.blockTitle}>Create an account</Text>
                  <Text style={styles.blockText}>
                    Sync your progress across all your devices. Don't lose your
                    stats if you change your phone.
                  </Text>
                  <Text style={styles.blockText}>
                    The app works fully without an account.
                  </Text>
                </View>

                <View
                  style={{
                    width: '35%',
                    flex: 1,
                    gap: s(10),
                  }}
                >
                  <AppButton
                    title="Sign Up"
                    onPress={() => {
                      router.navigate({
                        pathname: '/signUp',
                      });
                    }}
                    height={vs(30)}
                  />
                  <AppButton
                    title="Sign In"
                    onPress={() => {
                      router.navigate({
                        pathname: '/logIn',
                      });
                    }}
                    height={vs(30)}
                    isSecondary
                  />
                </View>
              </>
            )}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};
export default Account;
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
    padding: s(10),
    flexDirection: 'row',
    gap: s(10),
  },
  blockTitle: {
    fontSize: s(12),
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  blockText: {
    fontSize: s(10),
    color: COLORS.textPrimary,
    paddingTop: s(6),
  },
});
