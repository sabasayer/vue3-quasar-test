import type { Hobby, HobbyCategory } from "@/types";
import type { FirestoreDataConverter } from "firebase/firestore";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore/lite";
import { app } from "./firebase-setup";

const db = getFirestore(app);

export const getHobbyCategories = async () => {
  const categoryCol = collection(db, "hobbyCategory");
  const categorySnapshot = await getDocs(categoryCol);
  return categorySnapshot.docs.map((e) => e.data()) as HobbyCategory[];
};

const converter: FirestoreDataConverter<Hobby> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    data.startDate = data.startDate.toDate();
    return { ...(data as Hobby), id: data.id };
  },
  toFirestore(modelObject) {
    const timeStamp = Timestamp.fromDate(modelObject.startDate as Date);
    return { ...modelObject, startDate: timeStamp };
  },
};
const getHobbyCollection = () =>
  collection(db, "hobby").withConverter(converter);

const getHobby = (id: string) => doc(db, "hobby", id!);

export const updateHobby = async (data: Hobby) => {
  await setDoc(getHobby(data.id!), data);
};

export const addHobby = async (data: Hobby): Promise<Hobby> => {
  const hobbyCol = getHobbyCollection();

  const res = await addDoc(hobbyCol, data);
  return { ...data, id: res.id };
};

export const getHobbies = async () => {
  const hobbyCol = getHobbyCollection();
  const hobbySnapshot = await getDocs(hobbyCol);
  return hobbySnapshot.docs.map((e) => ({ ...e.data(), id: e.id })) as Hobby[];
};

export const removeHobby = async (data: Hobby) => {
  const hobbyRef = doc(db, "hobby", data.id!);

  await deleteDoc(hobbyRef);
};
