import { publicEndpoints } from "../axios/endpoints"
import axios from "../axios/private"
export const updateUser = (id, userInputs) => {
    const { name, mobile } = userInputs
    return axios.put(publicEndpoints.user + '/' + id, { name, mobile })
}

export const updateProfilePic = (file) => {
    return axios.post(publicEndpoints.profilePic, file)
}