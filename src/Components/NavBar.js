import React from 'react'
import { Button } from 'reactstrap'
import '../App.css'
import { NavLink as RRNavLink } from 'react-router-dom'
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
        <NavLink tag={RRNavLink} className='nav-link-tag'
        to="/" activeClassName="active" exact path="/"
        >Home</NavLink>
        </NavItem>
        
        <NavItem >
        <NavLink tag={RRNavLink} className='nav-link-tag'
        to="/profile" activeClassName="active" exact path="/profile"
        >Profile</NavLink>
        </NavItem>

        <NavItem  >
        <NavLink tag={RRNavLink} className='nav-link-tag'
        to="/history" activeClassName="active" exact path="/history"
        >History</NavLink>
        </NavItem>
        
        <NavItem  >
        <NavLink tag={RRNavLink} className='nav-link-tag'
        to="/analysis" activeClassName="active" exact path="/analysis"
        >Analysis</NavLink>
        </NavItem>
        <a className="ml-auto" href='https://github.com/vakas-786/Thrift-Paradox'><NavbarText style={{color: 'white'}} className="ml-auto">Thrift Paradox</NavbarText></a>
        </Nav>
        </Navbar>
      </div>
   
    )
  }
}
 
export default NavBar