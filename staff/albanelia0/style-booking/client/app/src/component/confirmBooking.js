import React, { Component } from 'react'
import createBooking from '../helpers/createBooking'
import logic from '../logic'
import { duration } from 'moment';
import swal from 'sweetalert2'
import '../design/confirmBooking.css'

class ConfirmBooking extends Component {
  state = {
    selectedServices: [],
    bookingDate: '',
    bookingHour: '',
  }

  componentWillMount() {
    let checkedList = localStorage.getItem('checkedList')
    checkedList = JSON.parse(checkedList)
    let date = localStorage.getItem('date')
    let hour = localStorage.getItem('hour')

    this.setState({
      selectedServices: checkedList,
      bookingDate: date,
      bookingHour: hour
    })
  }

  createTheBookingUser = () => {
    let token = localStorage.getItem('token')
    logic.setToken(token)
    createBooking().then(res => {
      console.log(res)
      if (res) {
        swal({
          type: 'success',
          title: 'Reserva completada! ves a tu perfil!',
        })
        this.props.history.push('/profile')
      } else {
        let date = localStorage.getItem("date")
        console.log(date)
        let _date = date.replace(/\,/g, "/")
        console.log(_date)
        this.props.history.push(`/calendar/${_date}`)
      }
    })
  }

  render() {
    return (
      <div>
        <h1 className="subtitle is-1  title-booking">Check Booking</h1>
        <section className="booking-container">
          <div className="booking-times">
            <h2>Date: {this.state.bookingDate}</h2>
            <h3>Hour: {this.state.bookingHour}</h3>
          </div>
          <div className="selected-services">
            {this.state.selectedServices.map(service => {
              return (
                <ul>
                  <li>Service name: {service.serviceName}</li>
                  <li>Duration: {service.duration}min</li>
                  <li>Price: {service.price}€</li>
                </ul>
              )
            })}
          </div>
        </section>
        <button onClick={this.createTheBookingUser} className="button is-large is-primary booking-button"> Confirm Booking</button>
      </div>
    )
  }
}

export default ConfirmBooking