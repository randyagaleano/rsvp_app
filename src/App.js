import React, { Component } from 'react';
import './App.css';
import GuestList from './components/GuestList.js';

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: "Treasure",
        isConfirmed: false,
        isEditing: false,
      },
      {
        name: "Emily",
        isConfirmed: true,
        isEditing: false,
      },
      {
        name: "David",
        isConfirmed: true,
        isEditing: true,
      }
    ]
  };

  toggleGuestPropertyAt = (property, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            // ^^^ "spread operator";
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

    toggleConfirmationAt = index => 
      this.toggleGuestPropertyAt("isConfirmed", index);

    removeGuestAt = index => 
      this.setState({
        guests: [
          ...this.state.guests.slice(0, index),
          ...this.state.guests.slice(index + 1)
        ]
      });

    toggleEditingAt = index => 
      this.toggleGuestPropertyAt("isEditing", index);

  setNameAt = (name, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            name,
          };
        }
        return guest;
      })
    });

  toggleFilter = () => 
    this.setState({
      isFiltered: !this.state.isFiltered
    });

  handleNameInput = e => 
    this.setState({
      pendingGuest: e.target.value
    });

  newGuestSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
        },
        ...this.state.guests
      ],
      pendingGuest: ''
    })
  }

  getTotalInvited = () => this.state.guests.length;
  // getAttendingGuests = () =>
  // getUnconfirmedGuests = () =>

  render() {
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <form onSubmit={this.newGuestSubmitHandler} >
              <input 
                type="text" 
                onChange={this.handleNameInput}
                value={this.state.pendingGuest} 
                placeholder="Add Guest" />
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Guests</h2>
            <label>
              <input 
                type="checkbox"
                onChange={this.toggleFilter} 
                checked={this.state.isfiltered}
              /> Hide unconfirmed guests
            </label>
          </div>
          <table className="counter">
            <tbody>
              <tr>
                <td>Attending:</td>
                <td></td>
              </tr>
              <tr>
                <td>Unconfirmed:</td>
                <td></td>
              </tr>
              <tr>
                <td>Total:</td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <GuestList 
            guests={this.state.guests}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt} 
            isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest}
            />

        </div>
      </div>
    );
  }
}

export default App;
