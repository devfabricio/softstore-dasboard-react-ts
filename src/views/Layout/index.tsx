import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useLayout } from '../context/LayoutProvider'

const Layout: React.FC = ({ children }) => {
  const { changeSidebarType, changeSidebarTheme, changeTopbarTheme, changeLayoutWidth, isPreloader, layoutWidth, topbarTheme, sidebarType, sidebarTheme } = useLayout()
  const history = useHistory()
  const capitalizeFirstLetter = useCallback((str: string): string => {
    return str.charAt(1).toUpperCase() + str.slice(2)
  }, [])

  useEffect(() => {
    if (isPreloader) {
      document.getElementById('preloader')!!.style.display = 'block'
      document.getElementById('status')!!.style.display = 'block'

      setTimeout(function () {
        document.getElementById('preloader')!!.style.display = 'none'
        document.getElementById('status')!!.style.display = 'none'
      }, 2500)
    } else {
      document.getElementById('preloader')!!.style.display = 'none'
      document.getElementById('status')!!.style.display = 'none'
    }

    // Scroll Top to 0
    window.scrollTo(0, 0)
    const currentage = capitalizeFirstLetter(history.location.pathname)

    document.title =
      currentage + ' | Skote - Responsive Bootstrap 4 Admin Dashboard'
    if (sidebarTheme) {
      changeSidebarTheme(sidebarTheme)
    }

    if (layoutWidth) {
      changeLayoutWidth(layoutWidth)
    }

    if (sidebarType) {
      changeSidebarType(sidebarType)
    }
    if (topbarTheme) {
      changeTopbarTheme(topbarTheme)
    }
  }, [capitalizeFirstLetter, changeLayoutWidth, changeSidebarTheme, changeSidebarType, changeTopbarTheme,
    history.location.pathname, isPreloader, layoutWidth, sidebarTheme, sidebarType, topbarTheme])

  return (
      <React.Fragment>
        <div id="preloader">
          <div id="status">
            <div className="spinner-chase">
              <div className="chase-dot"/>
              <div className="chase-dot"/>
              <div className="chase-dot"/>
              <div className="chase-dot"/>
              <div className="chase-dot"/>
              <div className="chase-dot"/>
            </div>
          </div>
        </div>

        <div id="layout-wrapper">
          <Header />
          <Sidebar
            type={sidebarType}
          />
          <div className="main-content">{ children }</div>
          <Footer />
        </div>
      </React.Fragment>
  )
}

export default Layout
