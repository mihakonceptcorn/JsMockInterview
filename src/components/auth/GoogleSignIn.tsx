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
    backgroundColor: '#4285F4', // Фірмовий колір Google
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
    elevation: 2, // Тінь для Android
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
