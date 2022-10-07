import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutUser,
} from "firebase/auth";
import type { AuthError } from "firebase/auth";

const auth = getAuth();

const createErrorMessage = (error: unknown) => {
  throw `${(error as AuthError).code}: ${(error as AuthError).message}`;
};

const signUp = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    throw createErrorMessage(error);
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    throw createErrorMessage(error);
  }
};

const signOut = async () => {
  try {
    await signOutUser(auth);
  } catch (error) {
    throw createErrorMessage(error);
  }
};

const getCurrentUser = () => auth.currentUser;

export const AuthMethods = {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
};
