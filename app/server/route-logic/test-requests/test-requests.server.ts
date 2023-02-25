import type { Params } from "@remix-run/react";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { db } from "~/server/db.server";
import type { FieldDoc, FormDoc, FormQuestion } from "./types";
import { FieldArrayTypes } from "./types";

// Level 3
// db operation helpers
