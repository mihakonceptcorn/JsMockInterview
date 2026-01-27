import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { useDispatch } from 'react-redux';
import { setProStatus } from '@/store/userSlice';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import AppButton from '../ui/AppButton';

interface PurchasePopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const PurchasePopup = ({ isVisible, onClose }: PurchasePopupProps) => {
  const [loading, setLoading] = useState(false);
  const [purchasePackage, setPurchasePackage] =
    useState<PurchasesPackage | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        if (!Purchases.isConfigured()) {
          console.log('Purchases not configured yet');
          return;
        }
        const offerings = await Purchases.getOfferings();
        if (
          offerings.current !== null &&
          offerings.current.availablePackages.length > 0
        ) {
          // Шукаємо lifetime пакет або беремо перший доступний
          const pkg =
            offerings.current.availablePackages.find(
              (p) => p.packageType === 'LIFETIME'
            ) || offerings.current.availablePackages[0];
          setPurchasePackage(pkg);
        }
      } catch (e) {
        console.log('Error fetching offerings:', e);
      }
    };

    if (isVisible) {
      fetchOfferings();
    }
  }, [isVisible]);

  const onPurchase = async () => {
    console.log('onPurchase');
    if (!purchasePackage) return;

    setLoading(true);
    try {
      const { customerInfo } = await Purchases.purchasePackage(purchasePackage);
      if (
        customerInfo.entitlements.active['premium_full_unlock'] !== undefined
      ) {
        dispatch(setProStatus(true));
        onClose();
      }
    } catch (e: any) {
      console.log(e);
      if (!e.userCancelled) {
        console.log('Purchase error:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Unlock Premium</Text>
          <Text style={styles.description}>
            Get lifetime access to all frameworks and interview stages.
          </Text>

          {purchasePackage ? (
            <View style={styles.packageInfo}>
              <Text style={styles.price}>
                {purchasePackage.product.priceString}
              </Text>
              <Text style={styles.duration}>One-time purchase</Text>
            </View>
          ) : (
            <ActivityIndicator
              size="large"
              color={COLORS.accent}
              style={styles.loader}
            />
          )}

          <View style={styles.actions}>
            <AppButton
              title={loading ? 'Processing...' : 'Purchase Now'}
              onPress={onPurchase}
              width="100%"
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PurchasePopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(20),
  },
  container: {
    backgroundColor: '#102C4C',
    borderRadius: s(16),
    padding: s(24),
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  title: {
    fontSize: s(20),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: vs(12),
  },
  description: {
    fontSize: s(14),
    color: '#ccc',
    textAlign: 'center',
    marginBottom: vs(20),
    lineHeight: s(20),
  },
  packageInfo: {
    alignItems: 'center',
    marginBottom: vs(24),
    padding: s(16),
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: s(12),
    width: '100%',
  },
  price: {
    fontSize: s(24),
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  duration: {
    fontSize: s(12),
    color: '#aaa',
    marginTop: vs(4),
  },
  loader: {
    marginVertical: vs(20),
  },
  actions: {
    width: '100%',
    gap: vs(12),
  },
  closeButton: {
    padding: s(10),
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#aaa',
    fontSize: s(14),
  },
});
