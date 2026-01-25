import React, {
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext,
} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { store } from '@/store';
import { downloadDataFromFirestore } from '@/store/syncSlice';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContextValue = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContextValue);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    try {
      const state = store.getState();
      const { uploadUserData } = await import('@/services/firestoreService');
      await uploadUserData(userCredential.user.uid, {
        results: state.results.current,
        lastModified: Date.now(),
      });
      console.log('Initial data uploaded to Firestore after signup');
    } catch (error) {
      console.error('Failed to upload data after signup:', error);
    }

    return userCredential;
  };

  const login = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    try {
      await store.dispatch(
        downloadDataFromFirestore({ userId: userCredential.user.uid })
      );
      console.log('Data downloaded from Firestore after login');
    } catch (error) {
      console.error('Failed to download data after login:', error);
    }

    return userCredential;
  };

  const logout = async (): Promise<void> => {
    return signOut(auth);
  };

  const resetPassword = async (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContextValue.Provider value={contextValue}>
      {children}
    </AuthContextValue.Provider>
  );
}
