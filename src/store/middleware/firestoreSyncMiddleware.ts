import { Middleware } from '@reduxjs/toolkit';
import { auth } from '@/config/firebaseConfig';
import { uploadWithRetry } from '@/services/firestoreService';

let debounceTimer: NodeJS.Timeout | null = null;
const DEBOUNCE_DELAY = 500; // 500ms

const firestoreSyncMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const user = auth.currentUser;
  if (!user) {
    return result;
  }

  const shouldSync = (action as any).type === 'results/setResult';

  if (!shouldSync) {
    return result;
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(async () => {
    try {
      const state = store.getState();

      const userData = {
        results: state.results.current,
        lastModified: Date.now(),
      };

      await uploadWithRetry(user.uid, userData);

      console.log('Auto-sync to Firestore completed');
    } catch (error) {
      console.error('Auto-sync to Firestore failed:', error);
    }
  }, DEBOUNCE_DELAY);

  return result;
};

export default firestoreSyncMiddleware;
