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
    

    componentDidMount() {
          if (this.props.user.token > 0) {
            this.fetchPrize()
          } else if (this.props.user.token === 0){
            this.props.history.push('/sorry')
          }
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