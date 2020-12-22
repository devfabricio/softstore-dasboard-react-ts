import React, { useState, useEffect } from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import { Link } from 'react-router-dom'

// users
import user1 from '../../../../assets/images/users/avatar-1.jpg'

const ProfileMenu: React.FC = () => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState('Admin')

  useEffect(() => {
    const authUser = localStorage.getItem('authUser') || ''

    if (localStorage.getItem('authUser')) {
      if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
        const obj = JSON.parse(authUser)
        setusername(obj.displayName)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === 'fake' ||
        process.env.REACT_APP_DEFAULTAUTH === 'jwt'
      ) {
        const obj = JSON.parse(authUser)
        setusername(obj.username)
      }
    }
  }, [])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ml-2 mr-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag="a" href="/profile">
            {' '}
            <i className="bx bx-user font-size-16 align-middle mr-1"/>
            Profile
          </DropdownItem>
          <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle mr-1"/>
            My Wallet
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge badge-success float-right">11</span>
            <i className="mdi mdi-settings font-size-17 align-middle mr-1"/>
            Settings
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle mr-1"/>
            Lock screen
          </DropdownItem>
          <div className="dropdown-divider"/>
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"/>
            Logout
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default ProfileMenu
