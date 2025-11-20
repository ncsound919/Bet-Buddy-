import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { getFirebaseDb } from './firebase';
import { Bet, BetFormData, BetResult } from '../models/Bet';

export class BetService {
  static async createBet(userId: string, betData: BetFormData): Promise<string> {
    const db = getFirebaseDb();
    const betsRef = collection(db, 'bets');
    
    const bet = {
      userId,
      ...betData,
      result: BetResult.PENDING,
      date: betData.date || new Date(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(betsRef, bet);
    return docRef.id;
  }

  static async updateBet(betId: string, updates: Partial<Bet>): Promise<void> {
    const db = getFirebaseDb();
    const betRef = doc(db, 'bets', betId);
    
    await updateDoc(betRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  }

  static async settleBet(betId: string, result: BetResult, profit?: number): Promise<void> {
    const db = getFirebaseDb();
    const betRef = doc(db, 'bets', betId);
    
    await updateDoc(betRef, {
      result,
      profit,
      settledAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  static async deleteBet(betId: string): Promise<void> {
    const db = getFirebaseDb();
    const betRef = doc(db, 'bets', betId);
    await deleteDoc(betRef);
  }

  static async getUserBets(userId: string, limitCount?: number): Promise<Bet[]> {
    const db = getFirebaseDb();
    const betsRef = collection(db, 'bets');
    
    let q = query(
      betsRef,
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );

    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
        updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
        settledAt: data.settledAt instanceof Timestamp ? data.settledAt.toDate() : undefined
      } as Bet;
    });
  }

  static async getBet(betId: string): Promise<Bet | null> {
    const db = getFirebaseDb();
    const betRef = doc(db, 'bets', betId);
    const betSnap = await getDoc(betRef);
    
    if (betSnap.exists()) {
      const data = betSnap.data();
      return {
        id: betSnap.id,
        ...data,
        date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
        updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
        settledAt: data.settledAt instanceof Timestamp ? data.settledAt.toDate() : undefined
      } as Bet;
    }
    
    return null;
  }

  static async getUserBetsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Bet[]> {
    const db = getFirebaseDb();
    const betsRef = collection(db, 'bets');
    
    const q = query(
      betsRef,
      where('userId', '==', userId),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
        updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
        settledAt: data.settledAt instanceof Timestamp ? data.settledAt.toDate() : undefined
      } as Bet;
    });
  }
}
