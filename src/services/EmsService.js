import axios from 'axios'

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/ems';

class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL + "/getAllEmployees");
    }

    createEmployee(employee) {
        let employees = [employee]
        return axios.post(EMPLOYEE_API_BASE_URL + "/addEmployees/",employees);
    }

    getEmployeeById(id) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/getEmployeeById/" + id);
    }

    updateEmployee(id, employee) {
        return axios.put(EMPLOYEE_API_BASE_URL + "/updateEmployeeById/" + id, employee);
    }

    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + "/deleteEmployeeById/" + id);
    }

    getEmployeeWrapperById(id) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/getEmpWrapperById/" + id);
    }
}

const employeeService = new EmployeeService();
export default employeeService;
