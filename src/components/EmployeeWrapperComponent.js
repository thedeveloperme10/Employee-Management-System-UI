import React, { useEffect, useState } from 'react'
import employeeService from '../services/EmsService'
import dependentService from '../services/DependentService'
import insuranceService from '../services/InsuranceService'
import { useParams } from 'react-router-dom'
import PieRechartComponent from "./PieRechartComponent";

const EmployeeWrapperComponent = () => {
    
    const [employee, setEmployee] = useState('')
    const {empId} = useParams()
    
    const [dependentId, setDependentId] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [dependentName, setDependentName] = useState('')
    const [dependentAge, setDependentAge] = useState('')
    const [dependentGender, setDependentGender] = useState('')
    const [relationship, setRelationship] = useState('')

    const [insuredId, setInsuredId] = useState('')
    const [amountCovered, setAmountCovered] = useState('')
    const [premiumPerMonth, setPremiumPerMonth] = useState('')

    const updateCurrentEmpDetails = () => {
        employeeService.getEmployeeWrapperById(empId).then((response) => {
            setEmployee(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        updateCurrentEmpDetails()
    }, [])

    var chartData = []
    for(var department in employee.departmentNetExpenditures) {
        var dict = {}
        dict["name"] = employee.departmentNetExpenditures[department].departmentName;
        dict["value"] = employee.departmentNetExpenditures[department].netExpenditure;
        chartData.push(dict);
    }

    const saveOrUpdateDependent = (d) => {
        d.preventDefault();

        const dependent = {dependentId, employeeId, dependentName, dependentAge, dependentGender, relationship}

        var isExistingDependent = false
        for(let index in employee.dependents) {
            if(dependentId === employee.dependents[index].dependentId) {
                isExistingDependent = true
            }
        }        
        
        if(isExistingDependent) {
            dependentService.updateDependent(dependent.dependentId, dependent).then((response) => {
                updateCurrentEmpDetails()
            }).catch(error => {
                console.log(error)
            })
        } else {
            dependentService.createDependent(dependent).then((response) => {
                updateCurrentEmpDetails()
            }).catch(error => {
                console.log(error)
            })
        }

        setDependentId("")
        setEmployeeId("")
        setDependentName("")
        setDependentAge("")
        setDependentGender("")
        setRelationship("")
    }

    const deleteDependent = (dependentId) => {
        dependentService.deleteDependent(dependentId).then((response) => {
            updateCurrentEmpDetails()
        }).catch(error => {
            console.log(error)
        })
    }

    const setDetailsForUpdateDependent = (d) => {
        setDependentId(d.dependentId)
        setEmployeeId(d.employeeId)
        setDependentName(d.dependentName)
        setDependentAge(d.dependentAge)
        setDependentGender(d.dependentGender)
        setRelationship(d.relationship)
    }

    const saveOrUpdateInsurance = (i) => {
        i.preventDefault();

        const insurance = {insuredId, amountCovered, premiumPerMonth}
        
        var isExistingInsuredId = false
        for(let index in employee.insurancePolicies) {
            if(insuredId === employee.insurancePolicies[index].insuredId) {
                isExistingInsuredId = true
            }
        }        
        
        if(isExistingInsuredId) {
            insuranceService.updateInsuranceById(insurance.insuredId, insurance).then((response) => {
                updateCurrentEmpDetails()
            }).catch(error => {
                console.log(error)
            })
        }else{
            insuranceService.createInsurance(insurance).then((response) => {
                updateCurrentEmpDetails()
            }).catch(error => {
                console.log(error)
            })
        }

        setInsuredId("")
        setAmountCovered("")
        setPremiumPerMonth("")
    }

    const setDetailsForUpdateInsurance = (i) => {
        setInsuredId(i.insuredId)
        setAmountCovered(i.amountCovered)
        setPremiumPerMonth(i.premiumPerMonth)
    }

    const deleteInsurance = (i) => {
        insuranceService.deleteInsurance(i.insuredId).then((response) => {
            updateCurrentEmpDetails()
        }).catch(error => {
            console.log(error)
        })
    }
    

    
    return (
        <div>
            <br /><br />
            <div className='container'>
                <h2 className="text-center"> Employee {employee.employeeName} </h2>
                <br />
                <div>
                    <table className="table table-bordered table-striped">
                        <tr>
                            <th> Employee ID </th>
                            <td> {employee.employeeId} </td>
                        </tr>
                        <tr>
                            <th> Name </th>
                            <td> {employee.employeeName} </td>
                        </tr>
                        <tr>
                            <th> Age </th>
                            <td> {employee.age} </td>
                        </tr>
                        <tr>
                            <th> Gender </th>
                            <td> {employee.gender} </td>
                        </tr>
                        <tr>
                            <th> Phone Number </th>
                            <td> {employee.phoneNumber} </td>
                        </tr>
                        <tr>
                            <th> Department ID </th>
                            <td> {employee.departmentId} </td>
                        </tr>
                        <tr>
                            <th> Department Name </th>
                            <td> {employee.departmentName} </td>
                        </tr>
                        <tr>
                            <th> Department Size </th>
                            <td> {employee.size} </td>
                        </tr>
                    </table>
                </div>

                <br /><br />

                <h2 className="text-center"> Salary Details </h2>
                <br />
                <div>
                    <table className="table table-bordered table-striped">
                        <tr>
                            <th> Basic Pay </th>
                            <td> {employee.basicPay} </td>
                        </tr>
                        <tr>
                            <th> Meal Allowance </th>
                            <td> {employee.mealAllowance} </td>
                        </tr>
                        <tr>
                            <th> Commute Allowance </th>
                            <td> {employee.commuteAllowance} </td>
                        </tr>
                        <tr>
                            <th> Phone Allowance </th>
                            <td> {employee.phoneAllowance} </td>
                        </tr>
                        <tr>
                            <th> Internet Allowance </th>
                            <td> {employee.internetAllowance} </td>
                        </tr>
                        <tr>
                            <th> Tax Percentage </th>
                            <td> {employee.taxPercentage} </td>
                        </tr>
                        <tr>
                            <th> Net Salary </th>
                            <td> {employee.netSalary} </td>
                        </tr>
                    </table>
                </div>

                <br /><br />

                <h2 className="text-center"> Dependent Details </h2>
                <br />
                <div>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <th> Dependent ID </th>
                            <th> Employee ID </th>
                            <th> Name </th>
                            <th> Age </th>
                            <th> Gender </th>
                            <th> Relationship </th>
                            <th> Actions </th>
                        </thead>
                        <tbody>
                            {
                                employee.dependents?.map(
                                    dependent =>
                                        <tr key={dependent.dependentId}>
                                            <td> {dependent.dependentId} </td>
                                            <td> {dependent.employeeId} </td>
                                            <td> {dependent.dependentName} </td>
                                            <td> {dependent.dependentAge} </td>
                                            <td> {dependent.dependentGender} </td>
                                            <td> {dependent.relationship} </td>
                                            <td> 
                                                <button 
                                                    type="button" 
                                                    className="btn btn-info" 
                                                    onClick={(e) => setDetailsForUpdateDependent(dependent)}
                                                    style={{marginLeft:'1em'}} 
                                                > 
                                                    Update 
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-danger" 
                                                    onClick={(e) => deleteDependent(dependent.dependentId)} 
                                                    style={{marginLeft:'1em'}} 
                                                > 
                                                    Delete 
                                                </button> 
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className = "card-body">
                    <form>
                        <div className = "form-group mb-2">
                            <label className = "form-label"> Dependent ID :</label>
                            <input
                                type = "text"
                                placeholder = "Enter dependent id"
                                name = "dependentId"
                                className = "form-control"
                                value = {dependentId}
                                onChange = {(d) => setDependentId(d.target.value)}
                            >
                            </input>
                        </div>
                        <div className = "form-group mb-2">
                            <label className = "form-label"> Employee ID :</label>
                            <input
                                type = "text"
                                placeholder = "Enter employee id"
                                name = "employeeId"
                                className = "form-control"
                                value = {employeeId}
                                onChange = {(d) => setEmployeeId(d.target.value)}
                            >
                            </input>
                        </div>
                        <div className = "form-group mb-2">
                            <label className = "form-label"> Dependent Name :</label>
                            <input
                                type = "text"
                                placeholder = "Enter dependent name"
                                name = "dependentName"
                                className = "form-control"
                                value = {dependentName}
                                onChange = {(d) => setDependentName(d.target.value)}
                            >
                            </input>
                        </div>
                        <div className = "form-group mb-2">
                            <label className = "form-label"> Dependent Age :</label>
                            <input
                                type = "number"
                                placeholder = "Enter dependent age"
                                name = "dependentAge"
                                className = "form-control"
                                value = {dependentAge}
                                onChange = {(d) => setDependentAge(d.target.value)}
                            >
                            </input>
                        </div>
                        <div className = "form-group mb-2">
                            <label className = "form-label"> Dependent Gender :</label>
                            <input
                                type = "text"
                                placeholder = "Enter Dependent Gender"
                                name = "dependentGender"
                                className = "form-control"
                                value = {dependentGender}
                                onChange = {(d) => setDependentGender(d.target.value)}
                            >
                            </input>
                        </div>
                        <div className = "form-group mb-2">
                            <label className = "form-label"> Relationship :</label>
                            <input
                                type = "text"
                                placeholder = "Enter Relationship"
                                name = "relationship"
                                className = "form-control"
                                value = {relationship}
                                onChange = {(d) => setRelationship(d.target.value)}
                            >
                            </input>
                        </div>
                        <button 
                            className = "btn btn-success" 
                            onClick = {(d) => saveOrUpdateDependent(d)} 
                        >
                            Submit 
                        </button>
                        <button 
                            className="btn btn-danger" 
                            style={{marginLeft:'1em'}} 
                        > 
                            Cancel 
                        </button>
                    </form>
                </div>

                <br /><br />

                <h2 className="text-center"> Insurance Details </h2>
                <br />
                <div>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <th> Insured ID </th>
                            <th> Amount Covered </th>
                            <th> Premium Per Month </th>
                            <th> Actions </th>
                        </thead>
                        <tbody>
                            {
                                employee.insurancePolicies?.map(
                                    insurance =>
                                        <tr key={insurance.insuredId}>
                                            <td> {insurance.insuredId} </td>
                                            <td> {insurance.amountCovered} </td>
                                            <td> {insurance.premiumPerMonth} </td>
                                            <td> 
                                                <button 
                                                    type="button" 
                                                    className="btn btn-info" 
                                                    onClick={(i) => setDetailsForUpdateInsurance(insurance)}
                                                    style={{marginLeft:'1em'}} 
                                                > 
                                                    Update 
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-danger" 
                                                    onClick={(e) => deleteInsurance(insurance)} 
                                                    style={{marginLeft:'1em'}} 
                                                > 
                                                    Delete 
                                                </button> 
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                
                <div className = "card-body">
                    <form>
                        <div className = "form-group mb-2">
                            <label className = "form-label"> Insured ID :</label>
                            <input
                                type = "text"
                                placeholder = "Enter insured id"
                                name = "insuredId"
                                className = "form-control"
                                value = {insuredId}
                                onChange = {(i) => setInsuredId(i.target.value)}
                            >
                            </input>
                        </div>
                        <div className = "form-group mb-2">
                            <label className = "form-label"> Amount Covered :</label>
                            <input
                                type = "number"
                                placeholder = "Enter Amount Covered"
                                name = "amountCovered"
                                className = "form-control"
                                value = {amountCovered}
                                onChange = {(i) => setAmountCovered(i.target.value)}
                            >
                            </input>
                        </div>
                        <div className = "form-group mb-2">
                            <label className = "form-label"> Premium Per Month :</label>
                            <input
                                type = "number"
                                placeholder = "Enter PremiumPerMonth"
                                name = "premiumPerMonth"
                                className = "form-control"
                                value = {premiumPerMonth}
                                onChange = {(i) => setPremiumPerMonth(i.target.value)}
                            >
                            </input>
                        </div>
                        <button 
                            className = "btn btn-success" 
                            onClick = {(i) => saveOrUpdateInsurance(i)} 
                        >
                            Submit 
                        </button>
                        <button 
                            className="btn btn-danger" 
                            style={{marginLeft:'1em'}} 
                        > 
                            Cancel 
                        </button>
                    </form>
                </div>

            </div>
            <br /><br />
            <h2>PIE CHART</h2>
            {<PieRechartComponent data={chartData} />}
            <br /><br />
        </div>
    )
}

export default EmployeeWrapperComponent
