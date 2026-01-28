import React, { useState } from 'react';
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
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import GoogleSignIn from '@/components/auth/GoogleSignIn';

const LoginScreen = () => {
  const { t } = useTranslation('auth');
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { login, resetPassword } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('login.errors.login_failed_title'), t('login.errors.fill_fields'));
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace('/profile');
    } catch (error: any) {
      let errorMessage = t('login.errors.general_error');

      if (error.code === 'auth/user-not-found') {
        errorMessage = t('login.errors.user_not_found');
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = t('login.errors.wrong_password');
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('login.errors.invalid_email');
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = t('login.errors.invalid_credential');
      }

      Alert.alert(t('login.errors.login_failed_title'), errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert(t('login.errors.login_failed_title'), t('login.errors.reset_email_missing'));
      return;
    }

    Alert.alert(t('login.reset_password_title'), t('login.reset_password_confirm', { email }), [
      { text: t('common:cancel'), style: 'cancel' },
      {
        text: t('common:send'),
        onPress: async () => {
          try {
            await resetPassword(email.trim());
            Alert.alert(t('common:success'), t('login.reset_password_success'));
          } catch (error: any) {
            Alert.alert(t('common:error'), t('login.reset_password_error'));
          }
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t('login.title')}</Text>

        <GoogleSignIn />

        <TextInput
          style={styles.input}
          placeholder={t('login.email_placeholder')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />

        <TextInput
          style={styles.input}
          placeholder={t('login.password_placeholder')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? t('login.loading') : t('login.button')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.linkTextSmall}>{t('login.forgot_password')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.navigate('signUp')}
        >
          <Text style={styles.linkText}>{t('login.no_account')}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
    marginTop: 15,
    padding: 10,
  },
  linkText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
  linkTextSmall: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 14,
  },
});
