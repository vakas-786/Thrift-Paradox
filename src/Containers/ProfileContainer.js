import React from 'react'
import Profile from '../Components/Profile'


class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.fetchUser()
    }


    render() {
        let filterPrize = this.props.user.prizes.filter(prize => prize.status === true)
        // console.log(filterPrize)
        let prize = filterPrize.map(prize => <Profile key={prize.id} prizeObj={prize} value={prize.value} image={prize.image_url}  />)
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