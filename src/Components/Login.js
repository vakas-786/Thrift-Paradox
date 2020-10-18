import React from 'react'
import '../App.css'
import {Form, FormGroup, Input, FormFeedback } from 'reactstrap'

 
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
        <h1 className="text-center" style={{color: 'white'}}>Thrift Paradox</h1>
        
          <FormGroup style={{border: '.0625rem solid rgba(34,42,66,.05)'}}>
            {this.props.error === 'Invalid username or password' ?<> <Input invalid style={{maxwidth: '333 px'}} type="text" name="username" placeholder="Username"  value={this.state.username} onChange={this.changeHandler} /> <FormFeedback>Incorrect Username or Password.</FormFeedback></>:
            <Input style={{maxwidth: '333 px'}} type="text" name="username" placeholder="Username"  value={this.state.username} onChange={this.changeHandler} /> }
          </FormGroup>
          <FormGroup style={{border: '.0625rem solid rgba(34,42,66,.05)'}}>
            {this.props.error === 'Invalid username or password' ? <><Input invalid style={{maxwidth: '333 px'}} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/><FormFeedback>Incorrect Username or Password.</FormFeedback> </>:
            <Input style={{maxwidth: '333 px'}} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />}
          </FormGroup>
        <Input style={{width: '20%', margin: 'auto', backgroundColor: '#525f7f', color: "white", maxwidth: '333 px'}} type="submit" value="Login" /> 
      </Form>
      </div>
    )
  }
}
 
export default Login