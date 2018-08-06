import React, {Component} from "react";
import { Link } from 'react-router-dom';

class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            confirmedpassword: "",
            inputpassword: "",
            inputusername: "",
            inputconfirmedpassword: "",
            signupFailed: false
        }
        this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
    }

    handleUsernameSubmit(event) {
        event.preventDefault();
        let newUsername = this.state.inputusername
        let newPassword = this.state.inputpassword
        let newConfirmedPassword= this.state.inputconfirmedpassword
        if (newPassword !== newConfirmedPassword){
            this.setState({ signupFailed: true})
        } else {
        this.setState({username: newUsername, password: newPassword, confirmedpassword: newConfirmedPassword})
        /* check that both passwords are the same. if they're not, prompt the user */

        fetch('/signup', { 
            method: "POST", 
            body: (JSON.stringify({
                username: newUsername,
                password: newPassword
                })
            )
        }).then(response => response.text())
        .then(response => {
            if (response === 'password too short'){
                this.setState({ signupFailed: true})
            }
        })
    }
    }
    
    handleUsernameChange = event => {
        this.setState({inputusername: event.target.value})
    }
    
    handlePasswordChange = event => {
        this.setState({inputpassword: event.target.value})
    }

    handleConfirmedPasswordChange = event => {
        this.setState({inputconfirmedpassword: event.target.value})
    }

    render(){
        return(
            <div>
            <h2>Ready to Sign Up?</h2>
            <form onSubmit={this.handleUsernameSubmit}>
                <input 
                    type="text" 
                    placeholder="username"
                    value={this.state.inputusername}
                    onChange={this.handleUsernameChange}>
                </input>
                <input 
                    type="password" 
                    placeholder="password"
                    value={this.state.inputpassword}
                    onChange={this.handlePasswordChange}>
                </input>
                <input 
                    type="password" 
                    placeholder="confirm password"
                    value={this.state.inputconfirmedpassword}
                    onChange={this.handleConfirmedPasswordChange}>
                </input>


                {/* have a second form for re-enter password */}
                <input 
                    type="submit">
                </input>
            </form>
            <Link to="/login">
                <button>
                Back
                </button>
            </Link>
            <div>
                {(this.state.signupFailed) ? <div>Sign up failed, password or username too short</div> : null}
                </div>
            </div>
        )
    }
}

export default SignUp;