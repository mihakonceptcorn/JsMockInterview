import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ENV } from '@/config/env';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  return Google.useAuthRequest({
    clientId: ENV.GOOGLE.WEB_CLIENT_ID,
  });
};
