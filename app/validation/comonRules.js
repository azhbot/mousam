import * as Yup from "yup";

export const email = Yup.string()
  .email("Invalid email")
  .required("Email is required");

// Password validation schema
export const password = Yup.string()
   .min(8, "Password must be at least 8 characters")
  .required("Password is required")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
  .matches(/[a-z]/, "Password must contain at least one lowercase letter") // At least one lowercase letter
  .matches(/\d/, "Password must contain at least one number") // At least one number

// Password confirmation validation schema (must match the password)
export const passwordRequired = Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match') // Ensure it matches the "password" field
  .required("This field can't be empty");

export const name = Yup.string()
  .required("Name is required");

export const phone = Yup.string()
  .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
  .required("Phone is required");

export const numberOfMachine = Yup.number()
  .typeError("Must be a number")
  .min(1, "At least 1 machine required")
  .required("Number of machines is required");

// PAN card validation (Assuming standard Indian PAN format: 5 letters, 4 digits, 1 letter)
export const pancard = Yup.string()
  .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format")
  .required("PAN card is required");

// PIN code (Assuming 6-digit Indian PIN)
export const pin = Yup.string()
  .matches(/^[0-9]{6}$/, "PIN code must be 6 digits")
  .required("PIN code is required");

  export const businessLicense=Yup.string()
  .required("License is required")

// Gender (Assuming a dropdown selection: Male, Female, Other)
export const gender = Yup.string()
  .transform(value => value?.toLowerCase())
  .oneOf(["male", "female", "other"], "Invalid gender selection")
  .required("Gender is required");

  export const villageOrTown=Yup.string()
  .required("Village or Town required")

// Address (General string, you can add min/max length if needed)
export const address = Yup.string()
  .required("Address is required");

// State
export const state = Yup.string()
  .required("State is required");

// District
export const dist = Yup.string()
  .required("District is required");

  //police station
  export const policeStation=Yup.string()
  .required("Police Station is required")

  //post ofice 
  export const postOffice=Yup.string()
  .required("Post Office is required")

  // sub division 

  export const subDivision=Yup.string()
  .required("Sub Division is required")

  //Landmark
  export const landmark=Yup.string()
  .required("Landmark is required")

  //Countart
 export const country=Yup.string()
 .required("Country is required")

 //Business Name 
export const businessName=Yup.string()
.required("Business Name is required")

//Business Address 
export const businessAddress=Yup.string()
.required("Business Address is required")

//description 
export const description = Yup.string()
  .test(
    "min-words",
    "Description must be at least 3 words",
    (value) => value && value.trim().split(/\s+/).length >= 3
  )
   .required("Give a little description");

// Size 
export const size= Yup.array()
  .min(1, "Select at least one size")
  .of(Yup.string().required())
  .required("Size is required")


// imageUrl
// imageUrl
// imageUrl
export const imageUrl = Yup.string()
  .nullable()
  .notRequired()
  .test(
    'is-valid-image-url',
    'Must be a valid image URI (http, https, file, or uri)',
    (value) => {
      if (!value) return true;

      const urlPattern = /^(https?:\/\/|file:\/\/|uri:).+\.(jpg|jpeg|png|gif)$/i;
      return urlPattern.test(value);
    }
  );
