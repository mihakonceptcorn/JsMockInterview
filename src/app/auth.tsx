import { View, Button } from 'react-native';
import { useEffect } from 'react';
import { useGoogleAuth } from '@/auth/googleAuth';
import { signInWithGoogleToken } from '@/auth/firebaseAuth';

const Auth = () => {
  const [request, response, promptAsync] = useGoogleAuth();

  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.authentication?.idToken;
      if (idToken) {
        signInWithGoogleToken(idToken);
      }
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
};

export default Auth;
