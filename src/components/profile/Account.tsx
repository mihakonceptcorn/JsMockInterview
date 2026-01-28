import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import AppButton from '@/components/ui/AppButton';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const Account = () => {
  const { t } = useTranslation('profile');
  const router = useRouter();
  const { user, logout } = useAuth();

  const showConfirmDialog = () => {
    Alert.alert(t('account.logout_confirm_title'), t('account.logout_confirm_desc'), [
      {
        text: t('account.cancel'),
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: t('account.logout'),
        onPress: () => logout(),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('account.title')}</Text>
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
                  title={t('account.logout')}
                  onPress={showConfirmDialog}
                  height={vs(30)}
                />
              </>
            ) : (
              <>
                <View style={{ width: '65%' }}>
                  <Text style={styles.blockTitle}>{t('account.create_account')}</Text>
                  <Text style={styles.blockText}>
                    {t('account.sync_desc')}
                  </Text>
                  <Text style={styles.blockText}>
                    {t('account.works_without_account')}
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
                    title={t('account.sign_up')}
                    onPress={() => {
                      router.navigate({
                        pathname: '/signUp',
                      });
                    }}
                    height={vs(30)}
                  />
                  <AppButton
                    title={t('account.sign_in')}
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
