import React from 'react' 

class Signup extends React.Component {
    state = {
        username: "",
        password: ""
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
            <form onSubmit={this.submitHandler} >
            <h1>Create an Account</h1>
            <div>
              <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
              <label htmlFor="username">Username</label>
            </div>
            <div>
              <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
              <label htmlFor="password">Password</label>
            </div>
                
            <input type="submit" value="Sign Up" />
            
          </form>
        )
    }
}

export default Signup 