import axios from 'axios';

export const urlBase = 'http://localhost:8080/'

export default class ApiServices {

  constructor(apiUrl) {
    this.urlFinal = `${urlBase}${apiUrl}`;
  }

  post(url, obj) {
    return axios.post(`${this.urlFinal}${url}`, obj);
  }
  
  put(url, obj) {
    return axios.put(`${this.urlFinal}${url}`, obj);
  }
  
  delete(url) {
    return axios.delete(`${this.urlFinal}${url}`);
  }

  get(url, options) {
    return axios.get(`${this.urlFinal}${url}`, options);
  }
}
