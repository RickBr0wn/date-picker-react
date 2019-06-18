import React from 'react'
import Calendar from './Components/Calendar'

function App() {
  const onDayClick = (e, day, month) => {
    alert(day)
  }
  return (
    <div>
      <Calendar
        width='600px'
        onDayClick={(e, day, month) => onDayClick(e, day, month)}
      />
    </div>
  )
}

export default App
