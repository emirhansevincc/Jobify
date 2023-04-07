import React from 'react'
import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {

  const [values, setValues] = useState(initialState)

  const { isLoading, showAlert, displayAlert, registerUser } = useAppContext()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => { 
    e.preventDefault()
    const { name, email, password , isMember} = values
    if(!email || !password || (!isMember && !name)) {
      displayAlert('Please provide all values!', 'danger');
      return
    }
    const currentUser = { name, email, password }
    if(isMember) {
      console.log('login');
    } else {
      registerUser(currentUser)
    }
  }

  return (
    <Wrapper className='full-page'>
      <form onSubmit={onSubmit} className='form'>
        <Logo />
        <h3>{values.isMember ? 'Login': 'Register'}</h3>

        {showAlert && <Alert />}

        {!values.isMember && (
        <FormRow
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
          />
        )}

        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>

      </form>
    </Wrapper>
  )
}

export default Register