import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Add Open Position
export const addOpenPosition = async (userId, position) => {
  await addDoc(collection(db, "users", userId, "openPositions"), position);
};

// Get Open Positions
export const getOpenPositions = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "openPositions"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Move Open → Closed
export const bookProfit = async (userId, positionId, closedData) => {
  const openRef = doc(db, "users", userId, "openPositions", positionId);
  const closedRef = collection(db, "users", userId, "closedPositions");

  await addDoc(closedRef, closedData);
  await deleteDoc(openRef);
};

// Get Closed Positions
export const getClosedPositions = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "closedPositions"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

//Delete Closed Position 
export const deleteClosedPosition = async (userId, positionId) => {
  const ref = doc(db, "users", userId, "closedPositions", positionId);
  await deleteDoc(ref);
};
