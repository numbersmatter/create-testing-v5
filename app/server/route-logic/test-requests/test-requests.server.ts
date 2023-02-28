import type { Params } from "@remix-run/react";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { db } from "~/server/db.server";
import type { FieldDoc, FormDoc, FormQuestion } from "./types";
import { FieldArrayTypes } from "./types";

// Level 3
// db operation helpers
const unique= ()=> db.unique().doc().id



// Level 4
// for export

export const getTestForms = async () =>{
  const formsSnap = await db.testForms().get();
  const forms = formsSnap.docs.map((doc)=>({ ...doc.data(), formId: doc.id}));
  return forms;
};

export const addForm = async (formValues: {formName: string, formText: string}) =>{
  const newFormRef = db.testForms().doc();

  const standardNewFormDefaults ={
    questionOrder: [],
    formQuestionObj: {},
    formFields:{},   
  };

  const newFormData: FormDoc = { ...standardNewFormDefaults, ...formValues};
  const writeResult = await newFormRef.create(newFormData);

  return { ...writeResult, formId: newFormRef.id}
};

export const updateForm =async ( 
  formId: string, 
  formValues:{
    formName?: string, 
    formText?:string, 
    questionOrder?: string[] 
  },
) => {
  const formRef = db.testForms().doc(formId);
  const writeResult = await formRef.update(formValues);

  return { writeResult}
};

export const addFormQuestion = async (
  formId: string,
  formQuestionValues: {
    questionName: string,
    questionText: string,
    // fieldOrder?: string[],
  } 
) => {
  const formRef = db.testForms().doc(formId);
  const newFormQuestionId = unique();

  const newFormQuest = {
    ...formQuestionValues,
    formQuestionId: newFormQuestionId,
  };

  const updateFormData = {
    formQuestionsArray: FieldValue.arrayUnion(newFormQuest),
  }

}

