/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import {baseUrl} from '../constants.json';

const getAllEmployees = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/employees`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

export default {getAllEmployees};