import React from 'react'
import {NavLink} from 'react-router-dom'

 
class Login extends React.Component {

  state = {
    username: "",
    password: ""
}

changeHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}

submitHandler = (e) => {
  e.preventDefault() 
  this.props.loginHandler(this.state)
}

  render() {
   
    return (
      <React.Fragment>

      <form onSubmit={this.submitHandler} >
        <h1>Login</h1>
        <div>
          <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
          <label htmlFor="username">Username</label>
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
          <label htmlFor="password">Password</label>
        </div>
        <input type="submit" value="Login" />
      </form>
      <NavLink to="/signup">
      <button >
        Register
      </button>
      </NavLink>
      
      </React.Fragment>
    )
  }
}
 
export default Login