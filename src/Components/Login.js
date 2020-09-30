import React from 'react'
import '../App.css'
import {NavLink} from 'react-router-dom'
import {Form, Button, FormGroup, Label, Input } from 'reactstrap'

 
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
      <div style={{padding: '100px'}}>

      <Form  className="login-form" onSubmit={this.submitHandler} >
        <h1 className="text-center" style={{color: 'white'}}>Login</h1>
        <div>
          <FormGroup style={{backgroundColor: '#525f7f', border: '.0625rem solid rgba(34,42,66,.05)'}}>
          <Input style={{backgroundColor: '#525f7f', color: "white"}} type="text" name="username" placeholder="Username"  value={this.state.username} onChange={this.changeHandler} > </Input>
          </FormGroup>
        </div>
        <div>
          <FormGroup style={{backgroundColor: '#525f7f', color: 'white' ,border: '.0625rem solid rgba(34,42,66,.05)'}}>
          <Input style={{backgroundColor: '#525f7f', color: "white"}} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} > </Input>
          </FormGroup>
        </div>
        <Input style={{width: '20%', margin: 'auto', backgroundColor: '#525f7f', color: "white"}} type="submit" value="Login"> </Input> 
      </Form>

      <div style={{padding: '10px'}}className= "text-center">
      <NavLink to="/signup">
      <Button  >
        Register
      </Button>
      </NavLink>
      </div>
      
      </div>
    )
  }
}
 
export default Login