import React from 'react'
import '../App.css'
import Profile from '../Components/Profile'
import { Jumbotron } from 'reactstrap';



class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    render() {
        let filterPrize = this.props.user.prizes.filter(prize => prize.status === true)
        let prize = filterPrize.map(prize => <Profile key={prize.id} prizeObj={prize} value={prize.value} image={prize.image_url}  />)
    return (
        <div className = 'profile-container'>
            <Jumbotron>
        <h2 style={{color: "white"}}>Profile Information</h2>
        <h5 style={{color: "white"}}>Welcome {this.props.user.firstname}! Here is a list of all your prizes!</h5>
        <div id = 'prize-container'>
        {prize}
        </div>
        </Jumbotron>
        </div>
        
    )
    }
}
export default ProfileContainer