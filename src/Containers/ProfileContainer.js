import React from 'react'
import Profile from '../Components/Profile'


class ProfileContainer extends React.Component {


    render() {
        console.log(this.props.user)
        let prize = this.props.user.prizes.map(prize => <Profile key={prize.id} prizeObj={prize} value={prize.value} image={prize.image_url}  />)
    return (
        <>
        <h2>Profile Information</h2>
        <h5>Welcome {this.props.user.firstname}! Here is a list of all your prizes!</h5>
        {prize}
        </>
    )
    }
}
export default ProfileContainer