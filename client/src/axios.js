import axios from 'axios'

const instance = axios.create({
    baseURL: "https://open-recipe-v1.herokuapp.com/",
})

export default instance