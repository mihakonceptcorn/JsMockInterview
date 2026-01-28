import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import GoogleSignIn from '@/components/auth/GoogleSignIn';

const SignUp = () => {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { signup } = useAuth();
  const router = useRouter();

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handleSignUp = async () => {
    // Basic validation
    if (!email || !password || !confirmPassword) {
      Alert.alert(t('signup.errors.signup_failed_title'), t('signup.errors.fill_fields'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('signup.errors.signup_failed_title'), t('signup.errors.passwords_mismatch'));
      return;
    }

    if (password.length < 6) {
      Alert.alert(t('signup.errors.signup_failed_title'), t('signup.errors.password_too_short'));
      return;
    }

    setLoading(true);
    try {
      await signup(email.trim(), password);
      Alert.alert(t('signup.success_title'), t('signup.success_message'));
      router.replace('/profile');
    } catch (error: any) {
      let errorMessage = t('signup.errors.general_error');

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = t('signup.errors.email_in_use');
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('signup.errors.invalid_email');
      } else if (error.code === 'auth/weak-password') {
        errorMessage = t('signup.errors.weak_password');
      }

      Alert.alert(t('signup.errors.signup_failed_title'), errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t('signup.title')}</Text>

        <GoogleSignIn />

        <TextInput
          style={styles.input}
          placeholder={t('signup.email_placeholder')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <TextInput
          ref={passwordRef}
          style={styles.input}
          placeholder={t('signup.password_placeholder')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        <TextInput
          ref={confirmPasswordRef}
          style={styles.input}
          placeholder={t('signup.confirm_password_placeholder')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoComplete="password"
          returnKeyType="done"
          onSubmitEditing={handleSignUp}
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{t('signup.button')}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.navigate('logIn')}
        >
          <Text style={styles.linkText}>{t('signup.have_account')}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40, // Extra space for better visual balance
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    height: 55,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 20,
    padding: 10,
  },
  linkText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
});
