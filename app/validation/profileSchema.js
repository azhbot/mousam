// validation/profileSchema.js
import * as Yup from "yup";
import { email, name,phone,numberOfMachine, imageUrl } from "./comonRules";

const profileSchema = Yup.object({
  name,
  email,
  phone,
 numberOfMachine,
 imageUrl
});

export default profileSchema;
