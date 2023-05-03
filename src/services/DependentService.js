import axios from 'axios'

const EMS_API_BASE_URL = 'http://localhost:8080/ems';

class DependentService {

    getDependents() {
        return axios.get(EMS_API_BASE_URL + "/getAllDependents");
    }

    createDependent(dependent) {
        let dependents = [dependent]
        return axios.post(EMS_API_BASE_URL + "/addDependent/", dependents).then((response) => {
            window.alert("Dependent added successfully")
        });
    }

    async updateDependent(id, dependent) {
        const response = await axios.put(EMS_API_BASE_URL + "/updateDependentById/" + id, dependent);
        window.alert("Dependent with Id - " + response.data.dependentId + " updated successfully");
    }

    async deleteDependent(id) {
        const response = await axios.delete(EMS_API_BASE_URL + "/deleteDependentById/" + id);
        window.alert("Dependent with Id - " + id + " deleted successfully");
    }

}

const dependentService = new DependentService();
export default dependentService;
