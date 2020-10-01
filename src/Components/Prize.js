import React from 'react'
import { withRouter } from 'react-router-dom'
import {Row, Col} from 'reactstrap'
import '../App.css'


class Prize extends React.Component {

    state ={
        prize: [],
        user: [],
        timeLeft: 5
    }

    fetchPrize = () => {
        fetch('http://localhost:3000/lottery')
        .then(response => response.json())
        .then(prize => this.setState({prize: prize}),() => console.log(this.state.prize))
    }
    
    componentDidMount() {
        this.interval = setInterval(
            () => this.setState({
              timeLeft: this.state.timeLeft - 1
            }), 1000)
        if (this.props.user.token > 0) {
            this.fetchPrize()
          } else if (this.props.user.token === 0){
            this.props.history.push('/sorry')
          }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("before update", prevProps.user.token)
        console.log('after update', prevState.user)
        if (prevState.timeLeft === 1){
            clearInterval(this.interval)
           }
    }


    componenetWillUnmount() {
        clearInterval(this.interval)
    }

    
    render() {
        let image = this.state.prize.image_url
        let name = this.state.prize.name
        return(
            <>
                {this.state.timeLeft > 0
                ?
                <div className='prize-image-container'>
                <img className='prize-image-container' src= {require('../images/lottery.gif')} alt='lottery-gif'/>
                </div>
                :

                <div>
            <h2>Prize</h2>
            <figure className='prize-figure'>
            <img src={image} alt="prize"/>
            <h3 ><figcaption>Congratulations! You just won a {name}!</figcaption></h3>
            </figure>
            </div>
        }
        </>
        )
    }
}

export default withRouter(Prize)