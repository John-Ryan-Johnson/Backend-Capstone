/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import {baseUrl} from '../constants.json';

const getAllMachineDetails = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/machineDetails`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

export default {getAllMachineDetails};