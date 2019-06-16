import React from 'react'
import './calendar.css'
import moment from 'moment'

export default class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.width = props.width || '350px'
    this.style = props.style || {}
  }

  state = {
    dateContext: moment(),
    today: moment(),
    showMonthPopUp: false,
    showYearPopUp: false
  }

  weekdays = moment.weekdays() // ['Sunday', 'Monday', 'Tuesday' ... ]
  weekdaysShort = moment.weekdaysShort() // ['Sun', 'Mon', 'Tues' ... ]
  months = moment.months()

  year = () => this.state.dateContext.format('Y')
  month = () => this.state.dateContext.format('MMMM')
  daysInMonth = () => this.state.dateContext.daysInMonth()
  currentDate = () => this.state.dateContext.get('date')
  currentDay = () => this.state.dateContext.format('D')

  firstDayOfTheMonth = () => {
    const { dateContext } = this.state
    return moment(dateContext)
      .startOf('month')
      .format('d') // Day of week [number 0-6]
  }

  render() {
    const weekdays = this.weekdaysShort.map(day => (
      <td key={day} className='week-day'>
        {day}
      </td>
    ))

    const blanks = []
    for (let i = 0; i < this.firstDayOfTheMonth(); i++) {
      blanks.push(
        <td key={i} className='empty-slot'>
          {''}
        </td>
      )
    }

    let datesInMonth = []
    for (let day = 1; day <= this.daysInMonth(); day++) {
      let className = day === this.currentDate() ? 'day current-day' : 'day'
      datesInMonth.push(
        <td key={Math.random()} className={className}>
          <span>{day}</span>
        </td>
      )
    }

    const totalSlots = [...blanks, ...datesInMonth]
    let rows = []
    let cells = []

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row)
      } else {
        let insertRow = cells.slice()
        rows.push(insertRow)
        cells = []
        cells.push(row)
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice()
        rows.push(insertRow)
      }
    })

    const trElems = rows.map((d, i) => {
      return <tr key={Math.random()}>{d}</tr>
    })

    return (
      <div className='calendar-container'>
        <table className='calendar'>
          <thead>
            <tr className='calendar-header' />
          </thead>
          <tbody>
            <tr>{weekdays}</tr>
            {trElems}
          </tbody>
        </table>
      </div>
    )
  }
}
