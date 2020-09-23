import React from 'react'

const Profile = (props) => {

    return (
        <div>
        <h3>Prizes</h3>
        <img src = {props.image} alt="prize"/>
        <h5>${props.value}</h5>
        </div>
    )
}

export default Profile