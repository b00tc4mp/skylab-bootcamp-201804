import React, { Component } from 'react'
import logic from '../logic'
import Calendar from './calendar'
import swal from 'sweetalert2'
import createBooking from '../helpers/createBooking'
import '../design/bookingHours.css'

const START_DAY = 8
const END_DAY = 17
let hourClicked = 0


class BookingHours extends Component {

  state = {
    date: [1],
    daysHours: [],
  }

  finishBooking = (hour) => {

    localStorage.setItem("date", this.state.date)
    localStorage.setItem("hour", hour)

    // if (result) {

    // PASARLO A SWEETALERT2

    let token = localStorage.getItem("token")
    if (!token) {
      swal({
        type: 'success',
        title: 'perfect! logueate para guardar tu reserva y listo!',
      })

      this.props.history.push('/login')
    } else {
      this.props.history.push('/confirmBooking')
    }
  }


  componentWillMount = (props) => {
    for (let h = START_DAY; h <= END_DAY; h += 0.25) {
      const justTheHour = Math.floor(h)
      const justTheMinutes = (h - justTheHour) * 60

      this.state.daysHours.push({
        value: h,
        hour: `${justTheHour}:${justTheMinutes || '00'}`,
        available: true
      })
    }
// GENERATES SOMETHING LIKE THIS:
// this.state.daysHours = [
//   {
//     hour: "8:00", value: 8, available: true
//   }
// ]

    const { match: { params: { year, month, day } } } = this.props
    console.log(year, month, day)

    this.setState({
      date: [year, month, day],
    })

    logic.getBookingHoursForYearMonthDay(year, month, day)
      .then(apiResponse => {
        return this.state.daysHours.map((hour) => {
          apiResponse.forEach((busyRange) => {
            if (hour.value >= busyRange.start && hour.value < busyRange.end) {
              hour.available = false
            }
          })
          return hour
        })
      })
      .then((daysHoursApplied) => {
        console.log(daysHoursApplied)
        this.setState({ daysHours: daysHoursApplied })
      })
  }

  displayHours = () => {

    return this.state.daysHours.map(hour => {
      let bookingClass = 'has-text-primary'

      if (!hour.available) {
        bookingClass = 'has-text-danger'
      }

      return (
        <div key={hour} className='card  card-hours'>
          <div className="card-content">
            <h1 onClick={() => this.finishBooking(hour.hour)} className={`title ${bookingClass}`}>{hour.hour}</h1>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <section>
          <h1 className="calendar-title subtitle">Hours of day</h1>
          <hr />
        </section>
        <div className="content-hours">
          {this.displayHours()}
        </div>
      </div>
    )
  }
}

export default BookingHours