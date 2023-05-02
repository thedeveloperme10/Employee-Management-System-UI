import axios from 'axios'

const EMS_API_BASE_URL = 'http://localhost:8080/ems';

class InsuranceService {

    createInsurance(insurance) {
        let insurances = [insurance]
        return axios.post(EMS_API_BASE_URL + "/addInsurance", insurances);
    }

    updateInsuranceById(id, insurance) {
        return axios.put(EMS_API_BASE_URL + "/updateInsuranceById/" + id, insurance);
    }

    deleteInsurance(id) {
        return axios.delete(EMS_API_BASE_URL + "/deleteInsuranceById/" + id);
    }

}

const insuranceService = new InsuranceService();
export default insuranceService;
