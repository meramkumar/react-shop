import React, { Component } from 'react';

import './sign-up.style.scss'

class SignUp extends Component
{
    constructor(props)
    {
        super(props);
        this.State ={
            displayName:'',
            email:'',
            password:'',
            confirmpassword:''
        }
    }

    render()
    {
        return (
            <div className='sign-up'>SignUp</div>
        )
    } 
}

export default SignUp;