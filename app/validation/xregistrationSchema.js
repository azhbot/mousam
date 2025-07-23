import * as Yup from "yup"
import { 
    address, businessLicense, businessName, country, description, 
    dist, email, landmark, name, pancard, password, passwordRequired,
     phone, pin, policeStation, postOffice, state, subDivision, villageOrTown 
    } from "./comonRules"

const xregistrationSchema=Yup.object({
    name,
    businessName,
    businessLicense,
    email,
    pancard,
    phone,
    pin,
  
})

const xregistrationPasswordSchema=Yup.object({
    password,
    passwordRequired
})

const xregistrationFinalSchema=Yup.object({
    description,
    pin,
    landmark,
    address,
    villageOrTown,
    postOffice,
    policeStation,
    subDivision,
    dist,
    state,
    country,
    subDivision
})

export   {xregistrationSchema,xregistrationPasswordSchema,xregistrationFinalSchema};