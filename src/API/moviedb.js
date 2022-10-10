import axios from "axios"


// Token with which the API-calls are performed
const api_key = "78c6044020a7a1c7ca6c1b5e11df9d5b"

const moviedbClient = axios.create({
    // URL to be extended for the various API-Calls
    baseURL: "https://api.themoviedb.org/3",
    //Automatically sets token on the instance
    params: {api_key: api_key},
})

export default moviedbClient