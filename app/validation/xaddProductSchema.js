import * as Yup from "yup";
import { gender, imageUrl, size } from "./comonRules";

const xaddProductSchema = Yup.object({
  name: Yup.string().required("Product Name is required"),
  
  cost: Yup.number()
    .typeError("Must be a number")
    .required("Making Price is required"),
  
  gender,

  type: Yup.string()
    // .oneOf(["male", "two", "three"], "Invalid type")
    .required("Select type"),
  
  category: Yup.string()
    // .oneOf(["first", "second", "third"], "Invalid category")
    .required("Select Category"),

  subCategory: Yup.string()
    // .oneOf(["first", "second", "third"], "Invalid category")
    .required("Select Sub-category"),
  
  size,

  variant: Yup.string()

    .required("Variant is required"),

    rawMaterials: Yup.array()
    .min(1, "At least one raw material is required")  // Ensures the array has at least one item
    .of(
      Yup.object().shape({
        id: Yup.string().required("ID is required"),
        name: Yup.string().trim().required("Raw Material is required"),
      })
    ),
    imageUrl
  
  // additionalDetails: Yup.array().optional(), // No validation, just allows an array
});

export default xaddProductSchema;
