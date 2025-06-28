import { db } from "./firebaseConfig";
import { collection, addDoc, setDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

// Add a new open position
export const addOpenPosition = async (userId, position) => {
  await addDoc(collection(db, "users", userId, "openPositions"), position);
};

// Get all open positions
export const getOpenPositions = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "openPositions"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Move to closed and delete from open
export const bookProfit = async (userId, positionId, closedData) => {
  const openRef = doc(db, "users", userId, "openPositions", positionId);
  const closedRef = collection(db, "users", userId, "closedPositions");

  await addDoc(closedRef, closedData);
  await deleteDoc(openRef);
};

// Get closed positions
export const getClosedPositions = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "closedPositions"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
