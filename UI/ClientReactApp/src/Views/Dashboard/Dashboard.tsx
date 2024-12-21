import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow, CWidgetStatsD, CWidgetStatsC } from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { cibFacebook, cibGoogle, cibTwitter, cilCalendar, cilChartPie, cilSpeedometer, cilUserFollow } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Dashboard = () => {
  const random = () => Math.round(Math.random() * 100)

  return (
    <CRow>

        <CCol xs={3}>
            <CWidgetStatsD
            className="mb-3"
            icon={<CIcon className="my-4 text-white" icon={cilCalendar} height={52} />}
            chart={
                <CChartLine
                className="position-absolute w-100 h-100"
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                    {
                        backgroundColor: 'rgba(255,255,255,.1)',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointHoverBackgroundColor: '#fff',
                        borderWidth: 2,
                        data: [65, 59, 84, 84, 51, 55, 40],
                        fill: true,
                    },
                    ],
                }}
                options={{
                    elements: {
                    line: {
                        tension: 0.4,
                    },
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3,
                    },
                    },
                    maintainAspectRatio: false,
                    plugins: {
                    legend: {
                        display: false,
                    },
                    },
                    scales: {
                    x: {
                        display: false,
                    },
                    y: {
                        display: false,
                    },
                    },
                }}
                />
            }
            style={{ '--cui-card-cap-bg': '#3b5998' }}
            values={[
                { title: 'friends', value: '89K' },
                { title: 'feeds', value: '459' },
            ]}
             color="warning"

            />
        </CCol>
        <CCol xs={3}>
            <CWidgetStatsD
            className="mb-3"
            color="primary"
            icon={<CIcon className="my-4 text-white" icon={cilChartPie} height={52} />}
            chart={
                <CChartLine
                className="position-absolute w-100 h-100"
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                    {
                        backgroundColor: 'rgba(255,255,255,.1)',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointHoverBackgroundColor: '#fff',
                        borderWidth: 2,
                        data: [1, 13, 9, 17, 34, 41, 38],
                        fill: true,
                    },
                    ],
                }}
                options={{
                    elements: {
                    line: {
                        tension: 0.4,
                    },
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3,
                    },
                    },
                    maintainAspectRatio: false,
                    plugins: {
                    legend: {
                        display: false,
                    },
                    },
                    scales: {
                    x: {
                        display: false,
                    },
                    y: {
                        display: false,
                    },
                    },
                }}
                />
            }
            style={{ '--cui-card-cap-bg': '#00aced' }}
            values={[
                { title: 'folowers', value: '973K' },
                { title: 'tweets', value: '1.792' },
            ]}
            />
        </CCol>
       
        <CCol xs={3}>
            
            <CWidgetStatsC
                color="danger"
                icon={<CIcon icon={cilSpeedometer} height={36} />}
                value="5:34:11"
                title="Avg. Time"
                inverse
                progress={{ value: 75 }}
              />
        </CCol>
        <CCol xs={3}>
            <CWidgetStatsC
                color="success"
                icon={<CIcon icon={cilUserFollow} height={36} />}
                value="385"
                title="Your BMI"
                inverse
                progress={{ value: 75 }}
              />
        </CCol>
        <CCol xs={6}>
            <CCard className="mb-4">
            <CCardHeader>
                Bar Chart 
            </CCardHeader>
            <CCardBody>
                <CChartBar
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                    {
                        label: 'GitHub Commits',
                        backgroundColor: '#f87979',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                    ],
                }}
                labels="months"
                />
            </CCardBody>
            </CCard>
        </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            Pie Chart
          </CCardHeader>
          <CCardBody>
            <CChartPie
              data={{
                labels: ['Red', 'Green', 'Yellow'],
                datasets: [
                  {
                    data: [300, 50, 100],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard
