import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import employeeService from '../services/EmployeeService'

const EmployeeComponent = () => {
    
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
            console.log(employeeIdInDB)
            if(employeeIdInDB){
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
        <div className="container">
            <br />
            <div style={{backgroundColor:'gold'}}>
                <h1 className="text-center" style={{color:'darkgreen'}}> Employee Management System </h1>
            </div>
            <br /><br />
            <div className="row">
            <div className="card col-md-8 offset-md-2">
            {title()}
            <div className="card-body">
            <form>
            <div className="row mb-2">
                <div className="col-md-4">
                <div className="form-group">
                    <label className="form-label">Employee ID:</label>
                    <input
                    type="text"
                    placeholder="Enter employee id"
                    name="employeeId"
                    className="form-control"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    readOnly={isEmployeeIdReadOnly}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                    <label className="form-label">Employee Name:</label>
                    <input
                    type="text"
                    placeholder="Enter employee name"
                    name="employeeName"
                    className="form-control"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                    <label className="form-label">Age:</label>
                    <input
                    type="number"
                    placeholder="Enter age"
                    name="age"
                    className="form-control"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-4">
                <div className="form-group">
                    <label className="form-label">Gender:</label>
                    <input
                    type="text"
                    placeholder="Enter gender"
                    name="gender"
                    className="form-control"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                    <label className="form-label">Phone Number:</label>
                    <input
                    type="number"
                    placeholder="Enter phone number"
                    name="phoneNumber"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                    <label className="form-label">Department ID:</label>
                    <input
                    type="text"
                    placeholder="Enter department id"
                    name="departmentId"
                    className="form-control"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    />
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1">
                    <button
                        className="btn btn-success"
                        onClick={(e) => saveOrUpdateEmployee(e)}
                    >
                        Submit
                    </button>
                    </div>
                    <div className="col-md-1">
                                        <button className="btn btn-danger" style={{ marginLeft: '1em' }}>
                        Cancel
                    </button>
                    </div>
                </div>
                </form>
                </div>
            </div>
        </div>
        <br /><br />
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
        </div>
    )
}

export default EmployeeComponent
