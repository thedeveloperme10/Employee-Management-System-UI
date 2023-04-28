import axios from 'axios'

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/ems';

class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL + "/getAllEmployees");
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(id) {
        return axios.get(EMPLOYEE_API_BASE_URL + `/${id}`);
    }

    updateEmployee(id, employee) {
        return axios.put(EMPLOYEE_API_BASE_URL + `/${id}`, employee);
    }

    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + `/${id}`);
    }
}

const employeeService = new EmployeeService();
export default employeeService;
