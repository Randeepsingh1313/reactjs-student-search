import axios from 'axios'

export const baseUrl = 'https://api.hatchways.io/assessment/students'

export const fetchApi = async ( baseUrl ) => {
    const data = await axios.get(baseUrl)
    return data
}
