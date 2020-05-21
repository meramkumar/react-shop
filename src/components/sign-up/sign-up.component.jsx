import React, { Component } from 'react';

import './sign-up.style.scss'
import FormInput from '../form-input/form-input.component';
import FormButton from '../form-button/form-button.component';

import { auth, createUserProfile } from '../../firebase/firebase.utils';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert("password don't match");
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfile(user, { displayName });
            this.setState = {
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        } catch (error) {
            console.error(error);
        }

    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have account</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='displayName'
                        type='text'
                        label='Full Name'
                        value={displayName}
                        onChange={this.handleChange}
                        required />
                    <FormInput
                        name='email'
                        type='email'
                        label='Email'
                        value={email}
                        onChange={this.handleChange}
                        required />
                    <FormInput
                        name='password'
                        type='password'
                        label='Password'
                        value={password}
                        onChange={this.handleChange}
                        required />
                    <FormInput
                        name='confirmPassword'
                        type='password'
                        label='Confirm Password'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        required />

                    <div className='button'>
                        <FormButton type='submit'>SIGN UP</FormButton>

                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;