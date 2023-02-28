import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";
import type { FormInstanceDoc  } from "./route-logic/requests/types";
import type { FieldDoc, FormDoc, FormQuestion} from "./route-logic/test-requests/types";

// helper function to convert firestore data to typescript
const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

// helper to apply converter to multiple collections
const dataPoint = <T extends FirebaseFirestore.DocumentData>(
  collectionPath: string
) => getFirestore().collection(collectionPath).withConverter(converter<T>());


export type Note = {
  title: string;
  body: string;
}

const versionUrl = "testCollection/version5"


export const db = {
  userNotes: (uid: string) => dataPoint<Note>(`users/${uid}/notes`),
  requests: () => dataPoint<FormInstanceDoc>(`${versionUrl}/requests`),
  testFormQuestions: () => dataPoint<FormQuestion>(
    `${versionUrl}/testFormQuestions/`),
  testForms: () => dataPoint<FormDoc>(`${versionUrl}/testForms`),
  unique: () =>dataPoint('unique'),
  questionFields : ()=> dataPoint<FieldDoc>(
    `${versionUrl}/fields`)
};

// what does updating an object look like 

const akwardSilence = undefined;

const obj = {
  a: "hi",
  b: " nice to meet you",
  c: akwardSilence
}
const showobj2 = {
  a: "hi",
  b: " nice to meet you",
  c: akwardSilence,
  newId: "123"
}

//   { a:"hi", b:"nice to meet you", c: awkwardSilence}
const obj2 = { ...obj,  newId: "123"}
const obj2giveprop = { ...obj,  c: "123"}


const showobj2giveprop = {
  a: "hi",
  b: " nice to meet you",
  c: "123",
}







