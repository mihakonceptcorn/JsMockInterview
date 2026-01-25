import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '@/config/firebaseConfig';
import { useRouter } from 'expo-router';
import { store } from '@/store';
import { downloadDataFromFirestore } from '@/store/syncSlice';

const GoogleSignIn = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsSyncing(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('No ID Token found in response');
      }

      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);

      try {
        const { downloadUserData } =
          await import('@/services/firestoreService');
        const firestoreData = await downloadUserData(userCredential.user.uid);

        if (firestoreData) {
          await store.dispatch(
            downloadDataFromFirestore({ userId: userCredential.user.uid })
          );
          console.log(
            'Data downloaded from Firestore for existing Google user'
          );
        } else {
          const state = store.getState();
          const { uploadUserData } =
            await import('@/services/firestoreService');
          await uploadUserData(userCredential.user.uid, {
            results: state.results.current,
            lastModified: Date.now(),
          });
          console.log('Initial data uploaded to Firestore for new Google user');
        }
      } catch (error) {
        console.error('Failed to sync/upload data:', error);
      }

      router.replace('/profile');
      setIsSyncing(false);
    } catch (error: any) {
      console.error('Login error:', error.message);
      setIsSyncing(false);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
        disabled={isSyncing}
      >
        {isSyncing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <View style={styles.googleContent}>
            <FontAwesome
              name="google"
              size={20}
              color="#fff"
              style={styles.googleIcon}
            />
            <Text style={styles.googleText}>Sign in with Google</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default GoogleSignIn;
const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
    elevation: 2,
  },
  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    marginRight: 12,
  },
  googleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
