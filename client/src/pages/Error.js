import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'

const Error = () => {
  return (
    <Wrapper className='full-page'>
        <div>
            <img src={img} alt="404" />
            <p>We can't seem to find the page you're looking for</p>
            <Link to="/">Go to Home</Link>
        </div>
    </Wrapper>
  )
}

export default Error