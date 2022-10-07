import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyAdZyDFpetkkQJmFnPbys22FVyg3RETT44",
  authDomain: "hobby-chan.firebaseapp.com",
  projectId: "hobby-chan",
  storageBucket: "hobby-chan.appspot.com",
  messagingSenderId: "579367781497",
  appId: "1:579367781497:web:d449c07e9b7b04b19500a8",
  measurementId: "G-4NJZCJT2F8",
};

export const app = initializeApp(firebaseConfig);

(self as any).FIREBASE_APPCHECK_DEBUG_TOKEN =
  "646F591E-808C-43E6-87C6-E675F2B7023C";
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("abcdefghijklmnopqrstuvwxy-1234567890abcd"),
  isTokenAutoRefreshEnabled: true,
});
