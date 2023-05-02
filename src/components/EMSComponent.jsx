import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import employeeService from '../services/EmsService'

const EMSComponent = () => {
    
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        employeeService.getEmployees().then((response) => {
            setEmployees(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const [employeeId, setEmployeeId] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [isEmployeeIdReadOnly, setIsEmployeeIdReadOnly] = useState('')

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = {employeeId, employeeName, age, gender, phoneNumber, departmentId}

        let employeeIdInDB = NaN;

        employeeService.getEmployeeById(employeeId).then((response) =>{
            employeeIdInDB = response.data.employeeId;
        }).catch(error => {
            console.log(error)
            employeeIdInDB = NaN
        })

        setTimeout(() => {
        
            if(!isNaN(employeeIdInDB)){
                employeeService.updateEmployee(employeeId, employee).then((response) => {

                    employeeService.getEmployees().then((response) => {
                        setEmployees(response.data)
                    })
                }).catch(error => {
                    console.log(error)
                })
            }else{
                employeeService.createEmployee(employee).then((response) =>{

                    employeeService.getEmployees().then((response) => {
                        setEmployees(response.data)
                    })
        
                }).catch(error => {
                    console.log(error)
                })
            }

            setEmployeeId("")
            setEmployeeName("")
            setAge("")
            setGender("")
            setPhoneNumber("")
            setDepartmentId("")
            setIsEmployeeIdReadOnly(false);
        
        }, 1000);
    }

    const setDetailsForUpdateEmployee = (e) => {
        setEmployeeId(e.employeeId)
        setEmployeeName(e.employeeName)
        setAge(e.age)
        setGender(e.gender)
        setPhoneNumber(e.phoneNumber)
        setDepartmentId(e.departmentId)
        setIsEmployeeIdReadOnly(true);
    }

    const deleteEmployee = (e) => {
        employeeService.deleteEmployee(e.employeeId).then((response) => {
            employeeService.getEmployees().then((response) => {
                setEmployees(response.data)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    const title = () => {
        if(isEmployeeIdReadOnly){
            return <h2 className = "text-center">Update Employee</h2>
        }else{
            return <h2 className = "text-center">Add Employee</h2>
        }
    }


    return (
        <div>
        
            <div className='container'>
                <h2 className="text-center"> Employees </h2>
                <table className="table table-bordered table-striped">
                    <thead>
                        <th> Employee ID </th>
                        <th> Name </th>
                        <th> Age </th>
                        <th> Gender </th>
                        <th> Phone Number </th>
                        <th> Department ID </th>
                        <th> Actions </th>
                    </thead>
                    <tbody>
                        {
                            employees?.map(
                                employee =>
                                    <tr key={employee.employeeId}>
                                        <td> {employee.employeeId} </td>
                                        <td> {employee.employeeName} </td>
                                        <td> {employee.age} </td>
                                        <td> {employee.gender} </td>
                                        <td> {employee.phoneNumber} </td>
                                        <td> {employee.departmentId} </td>
                                        <td> 
                                            <Link 
                                                to = {"/employee/" + employee.employeeId}
                                                className = "btn btn-primary" 
                                                style={{marginLeft:'1em'}} 
                                            > 
                                                View Details 
                                            </Link>
                                            <button 
                                                type="button" 
                                                className="btn btn-info" 
                                                onClick={(e) => setDetailsForUpdateEmployee(employee)}
                                                style={{marginLeft:'1em'}} 
                                            > 
                                                Update 
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-danger" 
                                                onClick={(e) => deleteEmployee(employee)} 
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

            <br /><br />
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Employee ID :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter employee id"
                                        name = "employeeId"
                                        className = "form-control"
                                        value = {employeeId}
                                        onChange = {(e) => setEmployeeId(e.target.value)}
                                        readOnly = {isEmployeeIdReadOnly}
                                    >
                                    </input>
                                    <span value={isEmployeeIdReadOnly}></span>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Employee Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter employee name"
                                        name = "employeeName"
                                        className = "form-control"
                                        value = {employeeName}
                                        onChange = {(e) => setEmployeeName(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Age :</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter age"
                                        name = "age"
                                        className = "form-control"
                                        value = {age}
                                        onChange = {(e) => setAge(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Gender :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter gender"
                                        name = "gender"
                                        className = "form-control"
                                        value = {gender}
                                        onChange = {(e) => setGender(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Phone Number :</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter phone number"
                                        name = "phoneNumber"
                                        className = "form-control"
                                        value = {phoneNumber}
                                        onChange = {(e) => setPhoneNumber(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Department Id :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter department id"
                                        name = "departmentId"
                                        className = "form-control"
                                        value = {departmentId}
                                        onChange = {(e) => setDepartmentId(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button 
                                    className = "btn btn-success" 
                                    onClick = {(e) => saveOrUpdateEmployee(e)} 
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
                </div>
            </div>

        </div>
    )
}

export default EMSComponent
