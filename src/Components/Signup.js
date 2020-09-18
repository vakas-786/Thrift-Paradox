import React from 'react' 

class Signup extends React.Component {
    state = {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        avatar: ""
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

            <div>
              <input type="firstname" name="firstname" placeholder="First Name" value={this.state.password} onChange={this.changeHandler}/>
              <label htmlFor="firstname">First Name</label>
            </div>

            <div>
              <input type="lastname" name="lastname" placeholder="Last Name" value={this.state.password} onChange={this.changeHandler}/>
              <label htmlFor="lastname">Last Name</label>
            </div>

            <div>
              <input type="avatar" name="avatar" placeholder="Profile Pic" value={this.state.password} onChange={this.changeHandler}/>
              <label htmlFor="avatar">Profile Picture</label>
            </div>
                
            <input type="submit" value="Sign Up" />
            
          </form>
        )
    }
}

export default Signup 