import * as Yup from "yup"
import { country, dist, email, landmark, name, phone, pin, policeStation, postOffice, state } from "./comonRules"

const addressSchema=Yup.object({
    name,
    pin,
    phone,
    email,
    villageOrTown: Yup.string().required("Village or Town is required"),
    landmark,
    postOffice,
    policeStation,
    dist,
    state,
    country 
})

export default addressSchema;