import React from 'react'
import { Button } from 'reactstrap'
import '../App.css'
import { Navbar, Nav, NavItem, NavLink} from 'reactstrap'
 
class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar style={{backgroundColor: '#525f7f'}} light expand="md">
        <Nav  pills>
       {this.props.user ?
        <Button color ="secondary" onClick={this.props.logout}>
        Logout</Button>
       :
       <NavItem >
        <NavLink 
       href="/login"
        >Login</NavLink>
        </NavItem>  
      }
      <NavItem >
        <NavLink 
        href="/" active
        >Home</NavLink>
        </NavItem>
        
        <NavItem >
        <NavLink
        href="/profile" active
        >Profile</NavLink>
        </NavItem>

        <NavItem active >
        <NavLink
        href="/history" active
        >History</NavLink>
        </NavItem>
        
        <NavItem  >
        <NavLink
        href="/analysis" active 
        >Analysis</NavLink>
        </NavItem>
        </Nav>
        </Navbar>
      </div>
   
    )
  }
}
 
export default NavBar