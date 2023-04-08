import React from 'react'
import Wrapper from '../../assets/wrappers/SharedLayout.js'
import { Link, Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (
    <Wrapper>
      <nav>
        <Link to="add-job">Add Job</Link>
        <Link to="all-jobs">All Jobs</Link>
      </nav>
      <Outlet />
    </Wrapper>
  )
}

export default SharedLayout