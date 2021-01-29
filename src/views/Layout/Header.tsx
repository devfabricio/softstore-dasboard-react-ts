import React from 'react'
import { Link } from 'react-router-dom'
import NotificationDropdown from '../components/CommonForBoth/TopbarDropdown/NotificationDropdown'
import ProfileMenu from '../components/CommonForBoth/TopbarDropdown/ProfileMenu'
import logo from '../../assets/images/logo-light.png'
import logoSymbol from '../../assets/images/logo-symbol.png'
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
                  <img src={logoSymbol} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logo} alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light text-left">
                <span className="logo-sm">
                  <img src={logoSymbol} alt="" height="30" />
                </span>
                <span className="logo-lg">
                  <img src={logo} alt="" height="41" />
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
