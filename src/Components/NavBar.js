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
       
        <NavLink
        to="/login"
        exact
        style={link}
        activeStyle={{
          background: 'darkblue'
        }}
        >Login</NavLink>
      
      </div>
    </React.Fragment>
    )
  }
}
 
export default NavBar