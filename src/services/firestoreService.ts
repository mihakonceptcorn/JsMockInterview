import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

export interface UserData {
  results: Record<string, Record<string, any>>;
  lastModified: number;
}

interface FirestoreUserData {
  results: Record<string, Record<string, any>>;
  lastModified: Timestamp;
}

export async function uploadUserData(
  userId: string,
  data: UserData
): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId, 'userData', 'data');

    await setDoc(userDocRef, {
      results: data.results,
      lastModified: serverTimestamp(),
    });

    console.log('Data uploaded to Firestore successfully');
  } catch (error) {
    console.error('Error uploading data to Firestore:', error);
    throw error;
  }
}

export async function downloadUserData(
  userId: string
): Promise<UserData | null> {
  try {
    const userDocRef = doc(db, 'users', userId, 'userData', 'data');
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const firestoreData = docSnap.data() as FirestoreUserData;

      const userData: UserData = {
        results: firestoreData.results,
        lastModified: firestoreData.lastModified?.toMillis() || Date.now(),
      };

      console.log('Data downloaded from Firestore successfully');
      return userData;
    } else {
      console.log('No data found in Firestore for this user');
      return null;
    }
  } catch (error) {
    console.error('Error downloading data from Firestore:', error);
    throw error;
  }
}

export async function syncUserData(
  userId: string,
  localData: UserData
): Promise<UserData> {
  try {
    const firestoreData = await downloadUserData(userId);

    if (!firestoreData) {
      await uploadUserData(userId, localData);
      return localData;
    }

    const mergedData = mergeData(localData, firestoreData);

    await uploadUserData(userId, mergedData);

    console.log('Data synced successfully');

    return mergedData;
  } catch (error) {
    console.error('Error syncing data:', error);

    return localData;
  }
}

export async function deleteUserData(userId: string): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId, 'userData', 'data');
    await deleteDoc(userDocRef);
    console.log('✅ User data deleted from Firestore');
  } catch (error) {
    console.error('❌ Error deleting user data:', error);
    throw error;
  }
}

function mergeData(localData: UserData, firestoreData: UserData): UserData {
  const localTimestamp = localData.lastModified || 0;
  const firestoreTimestamp = firestoreData.lastModified || 0;

  if (firestoreTimestamp > localTimestamp) {
    console.log('ℹ️ Using Firestore data (newer)');
    return firestoreData;
  }

  console.log('ℹ️ Using local data (newer or same)');
  return localData;
}

export async function uploadWithRetry(
  userId: string,
  data: UserData,
  retries = 3
): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      await uploadUserData(userId, data);
      return;
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }

      const delay = Math.pow(2, i) * 1000;
      console.log(`Retry ${i + 1}/${retries} after ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
