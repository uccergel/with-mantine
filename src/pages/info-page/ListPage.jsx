import { Table } from '@mantine/core'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils'

export default function ListPage() {
  const [employees, setEmployees] = useState([])
  const [jobStation, setJobStation] = useState([])
  const [bloodGroup, setBloodGroup] = useState([])
  const [martialStatus, setMartialStatus] = useState([])
  const [education, setEducation] = useState([])
  useEffect(() => {
    axiosInstance
      .get('employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.log(err))
    axiosInstance
      .get('jobStation')
      .then(res => setJobStation(res.data))
      .catch(err => console.log(err))
    axiosInstance
      .get('bloodGroup')
      .then(res => setBloodGroup(res.data))
      .catch(err => console.log(err))
    axiosInstance
      .get('martialStatus')
      .then(res => setMartialStatus(res.data))
      .catch(err => console.log(err))
    axiosInstance
      .get('education')
      .then(res => setEducation(res.data))
      .catch(err => console.log(err))
  }, [])

  const tableHeads = (
    <tr>
      <th>Personel Adı</th>
      <th>Telefon Numarası</th>
      <th>Doğum Tarihi</th>
      <th>Birimi</th>
      <th>Kan Grubu</th>
      <th>Eğitim Durumu</th>
      <th>Medeni Durumu</th>
    </tr>
  )

  const tableRows = employees?.map(employee => (
    <tr key={employee.id}>
      <td>
        {employee.name} {employee.surname}
      </td>
      <td>{employee.phoneNumber}</td>
      <td>{employee.birthDate}</td>
      <td>
        {
          jobStation?.find(
            jobStation => jobStation?.id === employee?.jobStationId
          )?.name
        }
      </td>
      <td>
        {
          bloodGroup?.find(
            bloodGroup => bloodGroup?.id === employee?.bloodGroupId
          )?.name
        }
      </td>
      <td>
        {
          education?.find(education => education?.id === employee?.educationId)
            ?.name
        }
      </td>
      <td>
        {
          martialStatus?.find(
            martialStatus => martialStatus?.id === employee?.martialStatusId
          )?.name
        }
      </td>
    </tr>
  ))
  return (
    <Table
      className="text-center w-auto mx-auto"
      striped
      highlightOnHover
      withColumnBorders
      withBorder
    >
      <thead>{tableHeads}</thead>
      <tbody>{tableRows}</tbody>
    </Table>
  )
}
