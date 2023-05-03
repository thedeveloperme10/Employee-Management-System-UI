import axios from 'axios'

const EMS_API_BASE_URL = 'http://localhost:8080/ems';

class InsuranceService {

    async createInsurance(insurance) {
        let insurances = [insurance]
        const response = await axios.post(EMS_API_BASE_URL + "/addInsurance", insurances);
        window.alert("Insurance added successfully");
    }

    async updateInsuranceById(id, insurance) {
        const response = await axios.put(EMS_API_BASE_URL + "/updateInsuranceById/" + id, insurance);
        window.alert("Insurance with Id - " + id + " updated successfully");
    }

    async deleteInsurance(id) {
        const res = await axios.delete(EMS_API_BASE_URL + "/deleteInsuranceById/" + id);
        window.alert("Insurance with Id - " + id + " deleted successfully");
    }

}

const insuranceService = new InsuranceService();
export default insuranceService;
