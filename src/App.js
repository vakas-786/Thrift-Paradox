import React from 'react'
import './App.css'
import {  Switch, Route, withRouter } from 'react-router-dom';
import Header from './Components/Header'
import Signup from './Components/Signup'
import HomeContainer from './Containers/HomeContainer'
import ProfileContainer from './Containers/ProfileContainer'
import WelcomeContainer from './Containers/WelcomeContainer'
class App extends React.Component {
  
  state={
    user: undefined
  }

  componentDidMount() {
      let token = localStorage.getItem("token")
      if (token !== null || undefined) {
        fetch('http://localhost:3000/api/v1/profile', {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => this.setState({user: data.user}))
      } else {
        this.props.history.push("/login")
      }
  }

  loginHandler = (userObj) => {
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        accepts: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ user: userObj})
    })
    .then(response => response.json())
    .then(data => {
      if (data.jwt !== undefined) {
        localStorage.setItem("token", data.jwt)
        this.setState({user: data.user})
      }
    })
  }

  logoutHandler = () => {
    localStorage.removeItem('token')
    this.props.history.push("/login")
    this.setState({ user: false})
  }

  signupHandler = (userObj) => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        accepts: "application/json", 
        "content-type": "application/json"
      },
      body: JSON.stringify({ user: userObj })
    })
    .then(response => response.json())
    .then(data => this.setState({user: data.user}, ()=> this.props.history.push("/login")))
  }


  render() {
    return(
      <>
      <Header />
      <Switch>
        {this.state.user !== undefined 
        ?
        <>
        <Route path="/welcome" render={() => <WelcomeContainer  />} />
        <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler} />} />
        </>
        :
        <>
        <Route path="/" render={() => <HomeContainer />} />
        <Route path="/profile" render={() => <ProfileContainer />} />
        </>
        }
      </Switch>
      </>
    )
  }
}

export default withRouter(App)
