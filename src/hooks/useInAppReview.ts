import { useCallback } from 'react';
import * as StoreReview from 'expo-store-review';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REVIEW_KEY = 'last_review_requested';
const STAGES_KEY = 'completed_stages_count';
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;
const MIN_STAGES_COMPLETED = 3;

export const useInAppReview = () => {
  const incrementStagesCount = useCallback(async (): Promise<number> => {
    const current = await AsyncStorage.getItem(STAGES_KEY);
    const next = current !== null ? parseInt(current, 10) + 1 : 1;
    await AsyncStorage.setItem(STAGES_KEY, String(next));
    return next;
  }, []);

  const requestReviewIfNeeded = useCallback(async (): Promise<void> => {
    try {
      const isAvailable = await StoreReview.isAvailableAsync();
      if (!isAvailable) return;

      const stagesCompleted = await incrementStagesCount();
      if (stagesCompleted < MIN_STAGES_COMPLETED) return;

      const lastRequested = await AsyncStorage.getItem(REVIEW_KEY);
      const now = Date.now();

      if (lastRequested !== null) {
        const elapsed = now - parseInt(lastRequested, 10);
        if (elapsed < ONE_MONTH_MS) return;
      }

      await StoreReview.requestReview();
      await AsyncStorage.setItem(REVIEW_KEY, String(now));
    } catch (error) {
      console.error('InAppReview error:', error);
    }
  }, [incrementStagesCount]);

  return { requestReviewIfNeeded };
};
