import React from 'react'
import { withRouter } from 'react-router-dom'

class Prize extends React.Component {

    state ={
        prize: [],
        user: []
    }

    fetchPrize = () => {
        fetch('http://localhost:3000/lottery')
        .then(response => response.json())
        .then(prize => this.setState({prize: prize}),() => console.log(this.state.prize))
    }
    

    updateToken = () => {
        let current_token = this.props.user.token
        let redeem = parseInt(current_token) - 1 
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({token: redeem})
            }
            fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, options)
            .then(()=> this.setState({user: this.props.user}))
        }

        // prizeStatus = (boolean) => {
        //     boolean = true
        //     const options = {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //         },
        //         body: JSON.stringify({status: boolean})
        //     }
        //     fetch(`http://localhost:3000/prizes/${this.state.prize.id}`, options)
        // }

    componentDidMount() {
        this.fetchPrize()
        this.updateToken()
        // this.prizeStatus()
        
    }

    componentDidUpdate(prev, after) {
        console.log("before update", prev.user.token)
        console.log('after update', after.user)

    }

    render() {
        
        let image = this.state.prize.image_url
        return(
            <div>
            <h2>Prize</h2>
            <img src={image} alt="prize"/>
            </div>
        )
    }
}

export default withRouter(Prize)