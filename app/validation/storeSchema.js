// validation/profileSchema.js
import * as Yup from "yup";
import { name } from "./comonRules";

const storeSchema = Yup.object({
  name,
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  numberOfMachine: Yup.number()
    .typeError("Must be a number")
    .min(1, "At least 1 machine required")
    .required("Number of machines is required"),
});

export default storeSchema;
