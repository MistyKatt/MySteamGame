import axios from 'axios'

const globalAxios = axios.create({
    baseURL:'https://react-learn-65818.firebaseio.com/',
    mode: 'no-cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',

      },
})


export default globalAxios