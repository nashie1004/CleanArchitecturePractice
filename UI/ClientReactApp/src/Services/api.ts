import axios from 'axios'

export default axios.create({
    baseURL: "https://localhost:7063",//import.meta.env.API_URL,
    withCredentials: true,
});