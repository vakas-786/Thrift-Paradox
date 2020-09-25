import React from 'react'
import './App.css'
import {  Switch, Route, withRouter } from 'react-router-dom';
import Header from './Components/Header'
import Signup from './Components/Signup'
import HomeContainer from './Containers/HomeContainer'
import Login from './Components/Login'
import Sorry from './Components/Sorry'
import History from './Components/History'
import Prize from './Components/Prize'
import ProfileContainer from './Containers/ProfileContainer'
import WelcomeContainer from './Containers/WelcomeContainer'
class App extends React.Component {
  
  state={
    user: null
  }

  fetchUser = () => {
    let token = localStorage.getItem("token")
      if (token !== null || undefined) {
        fetch('http://localhost:3000/api/v1/profile', {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => this.setState({user: data.user}), () => this.props.history.push("/"))
      } else {
        this.props.history.push("/login")
      }
  }
  
  componentDidMount() {
      this.fetchUser()
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
        this.setState({user: data.user}, ()=> this.props.history.push("/"))
      }
    })
  }

  logoutHandler = () => {
    localStorage.removeItem('token')
    this.props.history.push("/login")
    this.setState({ user: null})
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
    .then(data => this.setState({user: data.user}),()=> this.props.history.push("/login"))
  }

  logoutHandler = () => {
    localStorage.removeItem('token')
    this.props.history.push("/login")
    this.setState({ user: false})
  }


  clickHandler = (e) => {
    this.fetchUser()
    console.log('app state',this.state.user.token)
    let token = localStorage.getItem("token")
    fetch('http://localhost:3000/api/v1/profile', {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          console.log('data',data)
          if (data.user.token > 0) {
            this.props.history.push('/prize')
          } else if (data.user.token === 0){
            this.props.history.push('/sorry')
          }
        })
      }


  render() {
    return(
      <>
      <Header user={this.state.user} logout={this.logoutHandler} />
      <Switch>
        {this.state.user 
        
        ?
        <> 
        <Route exact path="/" render={() => <HomeContainer clickHandler={this.clickHandler} submitHandler={this.transactionHandler} transactions={this.state.transactions} user={this.state.user} />} />
        <Route exact path="/profile" render={() => <ProfileContainer user={this.state.user} fetchUser={this.fetchUser}/>} />
        <Route path="/history" render={() => <History transactions={this.state.transactions} deleteTransaction={this.deleteTransaction} />} />
        <Route exact path="/prize" render={() => <Prize user={this.state.user}/>} />
        <Route exact path="/sorry" render={() => <Sorry />} />
        </>
        :
        <> 
        <Route path="/login" render={() => <Login loginHandler={this.loginHandler} />} />
        <Route path="/" render={() => <WelcomeContainer loginHandler={this.loginHandler} />} />
        <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler} />} />
        </>
        }
      </Switch>
      </>
    )
  }
}

export default withRouter(App)
