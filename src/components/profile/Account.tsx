import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import AppButton from '@/components/ui/AppButton';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import Purchases from 'react-native-purchases';
import { useDispatch, useSelector } from 'react-redux';
import { setProStatus } from '@/store/userSlice';
import PurchasePopup from '@/components/stages/PurchasePopup';
import { RootState } from '@/store';

const Account = () => {
  const { t } = useTranslation('profile');
  const router = useRouter();
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPurchasePopupVisible, setIsPurchasePopupVisible] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const isPro = useSelector((state: RootState) => state.user.isPro);

  useEffect(() => {
    if (!isPro) {
      const fetchOfferings = async () => {
        try {
          if (!Purchases.isConfigured()) {
            return;
          }
          const offerings = await Purchases.getOfferings();
          if (
            offerings.current !== null &&
            offerings.current.availablePackages.length > 0
          ) {
            const pkg =
              offerings.current.availablePackages.find(
                (p) => p.packageType === 'LIFETIME'
              ) || offerings.current.availablePackages[0];
            setPrice(pkg.product.priceString);
          }
        } catch (e) {
          console.log('Error fetching offerings for Account:', e);
        }
      };

      fetchOfferings();
    }
  }, []);

  const showConfirmDialog = () => {
    Alert.alert(
      t('account.logout_confirm_title'),
      t('account.logout_confirm_desc'),
      [
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
      ]
    );
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      const customerInfo = await Purchases.restorePurchases();

      if (customerInfo.entitlements.active['premium'] !== undefined) {
        dispatch(setProStatus(true));
        alert(t('account.alerts.success_premium'));
      } else {
        alert(t('account.alerts.no_purchases'));
      }
    } catch (e: any) {
      console.error('Restore error:', e);
      if (e.code === Purchases.PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR) {
        alert(t('account.alerts.payment_pending'));
      } else {
        alert(t('account.alerts.error_purchase'));
      }
    }
    setLoading(false);
  };

  return (
    <>
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
                  <View style={{ width: '54%' }}>
                    <Text style={styles.blockTitle}>
                      {t('account.create_account')}
                    </Text>
                    <Text style={styles.blockText}>
                      {t('account.sync_desc')}
                    </Text>
                    <Text style={styles.blockText}>
                      {t('account.works_without_account')}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '46%',
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

        {!isPro && (
          <View style={styles.blockContainer}>
            <LinearGradient
              colors={['#0B1F36', '#102C4C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.innerContainer}>
                <View>
                  <Text style={styles.blockTitle}>
                    {t('account.premium_banner.title')}
                  </Text>

                  <Text style={styles.blockText}>
                    {t('account.premium_banner.desc')}
                  </Text>

                  <Text style={[styles.blockText, { marginBottom: vs(10) }]}>
                    {t('account.premium_banner.footer')}
                  </Text>

                  <AppButton
                    title={`${t('account.premium_banner.button')}${price ? ` — ${price}` : ''
                      }`}
                    onPress={() => setIsPurchasePopupVisible(true)}
                    height={vs(30)}
                  />
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {loading && (
          <ActivityIndicator
            size="small"
            color={COLORS.accent}
            style={styles.btn}
          />
        )}

        {!loading && (
          <TouchableOpacity onPress={handleRestore} style={styles.btn}>
            <Text style={styles.btnText}>{t('account.restore_purchase')}</Text>
          </TouchableOpacity>
        )}
      </View>
      <PurchasePopup
        isVisible={isPurchasePopupVisible}
        onClose={() => setIsPurchasePopupVisible(false)}
      />
    </>
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
    alignItems: 'center',
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
  btn: {
    alignItems: 'center',
    marginTop: vs(10),
  },
  btnText: {
    fontSize: s(12),
    color: COLORS.accent,
  },
});
