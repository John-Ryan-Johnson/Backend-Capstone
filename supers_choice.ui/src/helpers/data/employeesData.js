/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { baseUrl } from '../constants.json';

const getAllEmployees = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/Employees`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const getEmployeeById = (employeeId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/employees/${employeeId}`)
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });

// const getEmployeeByUid = (uid) =>
//   new Promise((resolve, reject) => {
//     axios
//       .get(`${baseUrl}/employees/uid/${uid}`)
//       .then((response) => resolve(response.data))
//       .catch((err) => reject(err));
//   });

const getEmployeeByUid = () => axios.get(`${baseUrl}/employees/uid`);



export default { getAllEmployees, getEmployeeById, getEmployeeByUid };
