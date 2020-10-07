import React from 'react'
import './App.css'
import {  Switch, Route, withRouter } from 'react-router-dom';
import NavBar from './Components/NavBar'
import HomeContainer from './Containers/HomeContainer'
import Login from './Components/Login'
import Sorry from './Components/Sorry'
import History from './Components/History'
import Prize from './Components/Prize'
import Analysis from './Components/Analysis'
import ProfileContainer from './Containers/ProfileContainer'
import EditTransaction from './Components/EditTransaction';
class App extends React.Component {
  
  state={
    user: null,
    account: [],
    transactions: [],
    savings: 0,
    account_id: 0
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


  fetchAccount = () => {
    fetch('http://localhost:3000/accounts')
    .then(response => response.json())
    .then(data => {
      let savings = data.map(obj => obj.saving)
      let id = data.map(obj => obj.id)
      this.setState({ account: data, savings: savings[0], account_id: id[0] })
    })
  }

  fetchTransactions = () => {
    fetch('http://localhost:3000/transactions')
    .then(response => response.json())
    .then(data => {
         this.setState({ transactions: data })
    })
  }
  
  
  componentDidMount() {
      this.fetchUser()
      this.fetchAccount()
      this.fetchTransactions()
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

      editSubmit = (transactionObj) => {
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({item: transactionObj.item, category: transactionObj.category})
        }
        fetch(`http://localhost:3000/transactions/${transactionObj.id}`, options)
        .then(()=> this.props.history.push('/history'))
      }

      


  render() {
    return(
      <div className="app-container">
      <Switch>
        {this.state.user 
        
        ?
        <> 
        <NavBar user={this.state.user} logout={this.logoutHandler} />
        <Route exact path="/" render={() => <HomeContainer user={this.state.user} fetchTransactions ={this.fetchTransactions} account_id={this.state.account_id} clickHandler={this.clickHandler} submitHandler={this.transactionHandler} transactions={this.state.transactions}  />} />
        <Route exact path="/profile" render={() => <ProfileContainer  user={this.state.user} fetchUser={this.fetchUser}/>} />
        <Route exact path="/history" render={() => <History />} />
        <Route exact path="/analysis" render={() => <Analysis fetchAccount={this.fetchAccount} savings={this.state.savings}  account={this.state.account} transactions={this.state.transactions} />} />
        <Route exact path="/prize" render={() => <Prize user={this.state.user}/>} />
        <Route exact path="/transactions/:id/edit" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let edit = this.state.transactions.find((transactionObj) => transactionObj.id ===id)
                            return (
                                edit ? <EditTransaction transaction={edit} submitHandler={this.editSubmit} /> : <h3>Not Found</h3>
                            )
                        }}/>
        <Route exact path="/sorry" render={() => <Sorry />} />
        </>
        :
        <> 
        <Route path="/login" render={() => <Login loginHandler={this.loginHandler} />} />
        </>
        }
      </Switch>
      </div>
    )
  }
}

export default withRouter(App)
