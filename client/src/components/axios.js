import axios from 'axios'
let instance;
export default instance = axios.create({
  baseURL: 'http://localhost:5000/'
});