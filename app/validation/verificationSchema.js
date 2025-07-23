// validation/verificationSchema.js
import * as Yup from "yup";
import { address, dist, email, gender, name, numberOfMachine, pancard, phone, pin, state } from "./comonRules";

const verificationSchema = Yup.object({
  name,
 phone,
 email,
 pancard,
 pin,
 gender,
 businessLicense: Yup.string()
    .required("Business License No. is required")
    .min(5, "Business License No. must be at least 5 characters long"),
  numberOfMachine,
  address,
  state,
  dist,
 numberOfMachine,
 address,
 state,
 dist
});

export default verificationSchema;
