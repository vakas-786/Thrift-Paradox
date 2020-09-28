import React from 'react'
import { Jumbotron, Container } from 'reactstrap';
import NavBar from '../Components/NavBar'

class Header extends React.Component { 
    
    render() {

        return(
    <div>
      
        
        <NavBar logout={this.props.logout} user={this.props.user} />
       
    </div>
        )
    }
}

export default Header