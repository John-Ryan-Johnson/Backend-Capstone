/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import {baseUrl} from '../constants.json';

const getAllMachines = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/machines`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const getMachinesByEmployeeId = (employeeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/machines/schedule/${employeeId}`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const getMachineInfoByEmployeeId = (employeeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/machines/machineInfo/${employeeId}`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

export default {getAllMachines, getMachinesByEmployeeId, getMachineInfoByEmployeeId};