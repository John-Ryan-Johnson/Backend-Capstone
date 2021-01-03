/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import {baseUrl} from '../constants.json';

const getMachineAssignmentsByEmployeeId = (employeeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/machineAssignments/history/${employeeId}`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const getMachineAssignmentsByEmployeeIdAndTodaysDate = (employeeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/machineAssignments/schedule/${employeeId}`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const getMachineAssignmentInfoByEmployeeIdAndMachineIdAndMachineAssignmentId = (employeeId, machineId, machineAssignmentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/machineAssignments/info/${employeeId}/${machineId}/${machineAssignmentId}`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const getMachineAssignmentScheduleByEmployeeIdAndMachineId = (employeeId, machineId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/machineAssignments/schedule/${employeeId}/${machineId}`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const postMachineAssignment = (newMachineAssignment) => axios.post(`${baseUrl}/machineAssignments`, newMachineAssignment);

export default { getMachineAssignmentsByEmployeeId, getMachineAssignmentsByEmployeeIdAndTodaysDate, getMachineAssignmentInfoByEmployeeIdAndMachineIdAndMachineAssignmentId, getMachineAssignmentScheduleByEmployeeIdAndMachineId, postMachineAssignment }