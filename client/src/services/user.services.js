import { publicEndpoints } from "../axios/endpoints"
import axios from "../axios/private"
export const updateUser = (id, userInputs) => {
    console.log(userInputs)
    console.log(id)
    const { name,mobile } = userInputs
    return axios.put(publicEndpoints.user + '/' + id, { name,mobile })
}