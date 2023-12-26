import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/upload'

const get = () => {
    const request = axios.get(baseUrl)
    // return request
    return request.then(response => response.data[0][0])  
}
const create = newObject => {
    console.log('sending to backend');
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  

export default {
    create, get
}