import React, { useEffect, useState } from 'react'
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
  return (
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
                      employees.map(
                          employee =>
                              <tr key={employee.employeeId}>
                                  <td> {employee.employeeId} </td>
                                  <td> {employee.employeeName} </td>
                                  <td> {employee.age} </td>
                                  <td> {employee.gender} </td>
                                  <td> {employee.phoneNumber} </td>
                                  <td> {employee.departmentId} </td>
                              </tr>
                      )
                  }
              </tbody>
          </table>
    </div>
  )
}

export default EMSComponent