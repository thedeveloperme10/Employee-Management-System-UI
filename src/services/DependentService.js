import axios from 'axios'

const EMS_API_BASE_URL = 'http://localhost:8080/ems';

class DependentService {

    getDependents() {
        return axios.get(EMS_API_BASE_URL + "/getAllDependents");
    }

    createDependent(dependent) {
        let dependents = [dependent]
        return axios.post(EMS_API_BASE_URL + "/addDependent/", dependents);
    }

    updateDependent(id, dependent) {
        return axios.put(EMS_API_BASE_URL + "/updateDependentById/" + id, dependent);
    }

    deleteDependent(id) {
        return axios.delete(EMS_API_BASE_URL + "/deleteDependentById/" + id);
    }

}

const dependentService = new DependentService();
export default dependentService;
