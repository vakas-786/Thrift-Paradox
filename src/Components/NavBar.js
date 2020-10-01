import React from 'react'
import { Button } from 'reactstrap'
import '../App.css'
import { Navbar, Nav, NavItem, NavLink, NavbarText} from 'reactstrap'
 
class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="navigation-bar" style={{backgroundColor: '#rgba(0, 0, 0, 0.2)'}}  expand="md">
        <Nav className="container-fluid" >
       {this.props.user ?
        <Button color ="secondary" onClick={this.props.logout}>
        Logout</Button>
       :
       <NavItem >
        <NavLink className='nav-link-tag'
       href="/login"
        >Login</NavLink>
        </NavItem>  
      }
      <NavItem >
        <NavLink className='nav-link-tag'
        href="/" active
        >Home</NavLink>
        </NavItem>
        
        <NavItem >
        <NavLink className='nav-link-tag'
        href="/profile" active
        >Profile</NavLink>
        </NavItem>

        <NavItem active >
        <NavLink className='nav-link-tag'
        href="/history" active
        >History</NavLink>
        </NavItem>
        
        <NavItem  >
        <NavLink className='nav-link-tag'
        href="/analysis" active 
        >Analysis</NavLink>
        </NavItem>
        <NavbarText style={{color: 'white'}} className="ml-auto">Thrift Paradox</NavbarText>
        </Nav>
        </Navbar>
      </div>
   
    )
  }
}
 
export default NavBar