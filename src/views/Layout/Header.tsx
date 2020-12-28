import React from 'react'
import { Link } from 'react-router-dom'
import NotificationDropdown from '../components/CommonForBoth/TopbarDropdown/NotificationDropdown'
import ProfileMenu from '../components/CommonForBoth/TopbarDropdown/ProfileMenu'
import logoLg from '../../assets/images/logo-saboreio-white.svg'
import { useLayout } from '../context/LayoutProvider'

const Header: React.FC = () => {
  const { changeSidebarType, sidebarType, toggleLeftmenu, leftMenuIsOpen } = useLayout()

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  function tToggle () {
    toggleLeftmenu(leftMenuIsOpen)
    if (sidebarType === 'default') {
      changeSidebarType('condensed', isMobile)
    } else if (sidebarType === 'condensed') {
      changeSidebarType('default', isMobile)
    }
  }
  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoLg} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLg} alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLg} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLg} alt="" height="40" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle()
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"/>
            </button>
          </div>
          <div className="d-flex">
            <NotificationDropdown />
            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header
