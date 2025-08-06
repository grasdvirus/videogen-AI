import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function signUp(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  // create user doc if not exist
  const userDoc = doc(db, "users", cred.user.uid);
  await setDoc(userDoc, {
    email,
    createdAt: Date.now(),
    role: "user",
  });
  return cred.user;
}

export async function signIn(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export async function getUserRole(user: User) {
  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return "user";
  return snap.data().role ?? "user";
}
