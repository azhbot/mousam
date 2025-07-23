import * as Yup from "yup"
import { numberOfMachine } from "./comonRules"

const machineSchema=Yup.object({
    numberOfMachine,
})

export default machineSchema;