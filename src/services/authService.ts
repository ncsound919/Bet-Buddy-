import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithCredential,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from './firebase';
import { User, UserSettings, UserStats } from '../models/User';

export class AuthService {
  static async signInWithEmail(email: string, password: string): Promise<FirebaseUser> {
    const auth = getFirebaseAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  }

  static async signUpWithEmail(email: string, password: string, displayName?: string): Promise<FirebaseUser> {
    const auth = getFirebaseAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore
    await this.createUserDocument(result.user, displayName);
    
    return result.user;
  }

  static async signInWithGoogle(idToken: string): Promise<FirebaseUser> {
    const auth = getFirebaseAuth();
    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);
    
    // Check if user document exists, if not create it
    const userDoc = await this.getUserDocument(result.user.uid);
    if (!userDoc) {
      await this.createUserDocument(result.user);
    }
    
    return result.user;
  }

  static async signOut(): Promise<void> {
    const auth = getFirebaseAuth();
    await signOut(auth);
  }

  static async createUserDocument(firebaseUser: FirebaseUser, displayName?: string): Promise<void> {
    const db = getFirebaseDb();
    const userRef = doc(db, 'users', firebaseUser.uid);
    
    const defaultSettings: UserSettings = {
      notifications: {
        weekly: true,
        insights: true,
        trends: true
      },
      privacy: {
        leaderboardOptIn: false
      }
    };

    const defaultStats: UserStats = {
      totalBets: 0,
      totalWins: 0,
      totalLosses: 0,
      totalProfit: 0,
      currentStreak: 0,
      longestStreak: 0,
      avgOdds: 0
    };

    const userData: Omit<User, 'id'> = {
      email: firebaseUser.email || '',
      displayName: displayName || firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
      isPro: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      settings: defaultSettings,
      stats: defaultStats
    };

    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  static async getUserDocument(userId: string): Promise<User | null> {
    const db = getFirebaseDb();
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as User;
    }
    
    return null;
  }

  static getCurrentUser(): FirebaseUser | null {
    const auth = getFirebaseAuth();
    return auth.currentUser;
  }
}
