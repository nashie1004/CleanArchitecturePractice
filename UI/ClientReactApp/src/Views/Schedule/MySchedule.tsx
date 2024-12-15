import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { CCard, CCardBody } from '@coreui/react'

const localizer = momentLocalizer(moment)

export default function MySchedule(props){
  return <CCard>
    <CCardBody>

    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      />
      </CCardBody>
  </CCard>
}