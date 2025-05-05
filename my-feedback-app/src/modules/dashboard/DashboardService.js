// src/modules/dashboard/DashboardService.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const getAllFeedback = async () => {
  const feedbackRef = collection(db, "feedback");
  const snapshot = await getDocs(feedbackRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
