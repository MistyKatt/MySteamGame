import axios from 'axios'

const globalAxios = axios.create({
    baseURL:'https://react-learn-65818.firebaseio.com/'
})

export default globalAxios