import * as Yup from "yup"
import { businessAddress, businessLicense, businessName, country, description, dist, email, landmark, name, pancard, phone, pin, policeStation, postOffice, state, subDivision, villageOrTown } from "./comonRules"

const xofficeSchema=Yup.object({
    businessName,
    businessLicense,
    name,
    email,
    pancard,
    phone,
    description,
    pin,
    businessAddress,
   description,
   landmark,
   villageOrTown,
   postOffice,
   policeStation,
   subDivision,
   dist,
   state,
   country
})

export default xofficeSchema;