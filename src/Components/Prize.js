import React from 'react'

class Prize extends React.Component {

    state ={
        prize: []
    }

    fetchPrize = () => {
        fetch('http://localhost:3000/lottery')
        .then(response => response.json())
        .then(prize => this.setState({prize: prize}))
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
        
        }

    componentDidMount() {
        this.fetchPrize()
        this.updateToken()
        console.log(this.props.user.id)
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

export default Prize