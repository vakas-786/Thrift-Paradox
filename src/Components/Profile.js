import React from 'react'
import '../App.css'

const Profile = (props) => {

    // console.log(props.prizeObj.status)
    return (
        <div className="prize-container">
            <figure>
        <img style={{height: '300px', width: '300px'}} src = {props.image} alt="prize"/>
        <figcaption style={{margin: 'auto'}}>${props.value}</figcaption>
        </figure>
        </div>
    )
}

export default Profile