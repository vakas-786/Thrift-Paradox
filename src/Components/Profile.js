import React from 'react'
import { Button } from 'reactstrap'
import '../App.css'

class Profile extends React.Component {

    clickHandler = (prize) => {
        let token = localStorage.getItem("token")
        let status = prize.status = false

        const options = {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
             Accept: "application/json",
         },
            body: JSON.stringify({status: status})
        }
        fetch(`https://thrift-paradox-api.herokuapp.com/prizes/${prize.id}`, options)
        .then(()=> this.props.render() )
    }

    render(){

        return (
            <div className="prize-container">
            <figure>
        <img style={{height: '300px', width: '280px'}} src = {this.props.image} alt="prize"/>
        <figcaption style={{margin: 'auto'}}>${this.props.value}</figcaption><Button onClick={()=> this.clickHandler(this.props.prize)}>Redeem</Button>
        </figure>
        </div>
    )
}
}


export default Profile