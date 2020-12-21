import React, { useCallback, useEffect, useState } from 'react'

// Layout Related Components
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useLayout } from '../context/LayoutContext'

interface LayoutProps {
  isPreloader: boolean,
  pathName: string,
}

const Layout: React.FC<LayoutProps> = (props) => {
  const [isMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
  const { changeSidebarType, changeSidebarTheme, changeTopbarTheme, changeLayoutWidth, layoutWidth, topbarTheme, sidebarType, sidebarTheme } = useLayout()

  const capitalizeFirstLetter = useCallback((str: string): string => {
    return str.charAt(1).toUpperCase() + str.slice(2)
  }, [])

  useEffect(() => {
    if (props.isPreloader) {
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
    const currentage = capitalizeFirstLetter(props.pathName)

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
  }, [capitalizeFirstLetter, props])

  const toggleMenuCallback = useCallback(() => {
    if (sidebarType === 'default') {
      changeSidebarType('condensed', isMobile)
    } else if (sidebarType === 'condensed') {
      changeSidebarType('default', isMobile)
    }
  }, [])

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
          <div className="main-content">{props.children}</div>
          <Footer />
        </div>
      </React.Fragment>
  )
}

export default Layout
