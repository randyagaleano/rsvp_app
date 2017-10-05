import React, { Component } from 'react';
import './App.css';
import GuestList from './components/GuestList.js';

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuests: "",
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
      pendingGuests: e.target.value
    });

  newGuestSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuests,
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
                value={this.state.pendingGuests} 
                placeholder="Invite Someone" />
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input 
                type="checkbox"
                onChange={this.toggleFilter} 
                checked={this.state.isfiltered}
              /> Hide those who haven't responded
            </label>
          </div>
          <table className="counter">
            <tbody>
              <tr>
                <td>Attending:</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Unconfirmed:</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>

          <GuestList 
            guests={this.state.guests}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt} 
            isFiltered={this.state.isFiltered}
            />

        </div>
      </div>
    );
  }
}

export default App;
