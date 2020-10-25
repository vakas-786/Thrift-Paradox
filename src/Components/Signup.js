import React from 'react' 
import '../App.css'
import {Form, FormGroup, Input, Button } from 'reactstrap'



class Signup extends React.Component {
    state = {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        token: 0
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault() 
        this.props.submitHandler(this.state)
    }

    render() {
        return(
            <Form className='register-form' onSubmit={this.submitHandler} >
            <h1 className='text-center' style={{color: 'white'}}>Create an Account</h1>
            <FormGroup>
              <Input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
              
            </FormGroup>

            <FormGroup>
              <Input type="firstname" name="firstname" placeholder="First Name" value={this.state.firstname} onChange={this.changeHandler}/>
            </FormGroup>

            <FormGroup>
              <Input type="lastname" name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={this.changeHandler}/>
           </FormGroup>

           <br></br>
           
           <div className='buttons-form'>
                <Button type="submit" value="Sign Up" >Sign Up</Button>
           </div>

            
          </Form>
        )
    }
}

export default Signup 