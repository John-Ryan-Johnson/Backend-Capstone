/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import {baseUrl} from '../constants.json';

const getAllDowntimeCodes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/downtimeCodes`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

export default {getAllDowntimeCodes};