import axios from 'axios'

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/ems';

class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL + "/getAllEmployees");
    }

    createEmployee(employee) {
        let employees = [employee]
        return axios.post(EMPLOYEE_API_BASE_URL + "/addEmployees/", employees).then((response) => {
            window.alert("Employee added successfully")
        });
    }

    getEmployeeById(id) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/getEmployeeById/" + id);
    }

    async updateEmployee(id, employee) {
        const response = await axios.put(EMPLOYEE_API_BASE_URL + "/updateEmployeeById/" + id, employee);
        window.alert("Employee with Id - " + response.data.employeeId + " updated successfully");
    }

    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + "/deleteEmployeeById/" + id).then((response) => {
            window.alert("Employee with Id - " + id + " deleted successfully");
        });
    }

    getEmployeeWrapperById(id) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/getEmpWrapperById/" + id);
    }
}

const employeeService = new EmployeeService();
export default employeeService;
