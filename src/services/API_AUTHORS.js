import axios from "axios";

export default axios.create({
    baseURL: "https://library-phi-nine.vercel.app/api/authors/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})