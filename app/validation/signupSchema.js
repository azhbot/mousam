// validation/SignupSchema.js
import * as Yup from "yup";
import { email, name,phone } from "./comonRules";

const signupSchema = Yup.object({
  name,
  email,
  phone,
});

export default signupSchema;
