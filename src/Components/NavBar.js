import React from 'react'
import { NavLink } from 'react-router-dom'
// import { Redirect } from 'react-router-dom'
 
const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}
 
class NavBar extends React.Component {
  render() {
    return (
      <React.Fragment>
      <div>
       {this.props.user ?
        <button onClick={this.props.logout}>
        Logout</button>
       :
        <NavLink
        to="/login"
        exact
        style={link}
        activeStyle={{
          background: 'darkblue'
        }}
        >Login</NavLink>
      }

        <NavLink
        to="/"
        exact
        style={link}
        activeStyle={{
          background: 'darkblue'
        }}
        >Home</NavLink>

        <NavLink
        to="/profile"
        exact
        style={link}
        activeStyle={{
          background: 'darkblue'
        }}
        >Profile</NavLink>

        <NavLink
        to="/history"
        exact
        style={link}
        activeStyle={{
          background: 'darkblue'
        }}
        >History</NavLink>

      </div>
    </React.Fragment>
    )
  }
}
 
export default NavBar