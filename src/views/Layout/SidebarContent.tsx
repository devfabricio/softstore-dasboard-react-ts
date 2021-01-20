import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import MetisMenu from 'metismenujs'
import { pageSections } from '../../data/pages'

const SidebarContent: React.FC = (props) => {
  const history = useHistory()

  const activateParentDropdown = (item: any) => {
    item.classList.add('active')
    const parent = item.parentElement

    if (parent) {
      parent.classList.add('mm-active')
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add('mm-show')

        const parent3 = parent2.parentElement

        if (parent3) {
          parent3.classList.add('mm-active') // li
          parent3.childNodes[0].classList.add('mm-active') // a
          const parent4 = parent3.parentElement
          if (parent4) {
            parent4.classList.add('mm-active')
          }
        }
      }
      return false
    }
    return false
  }

  useEffect(() => {
    const pathName = history.location.pathname

    const initMenu = () => {
      // eslint-disable-next-line no-new
      new MetisMenu('#side-menu')
      let matchingMenuItem = null
      const ul = document.getElementById('side-menu')
      const items = ul!!.getElementsByTagName('a')
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [history.location.pathname])

  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          {pageSections.map((section, index) => {
            const menuItens = section.subItens
            if (menuItens.length > 1) {
              return (
                <li key={index}>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className={`fas ${section.icon} `}/>
                    <span>{ section.name }</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    {menuItens.map((item, index) => {
                      return (<li key={index}><Link to={item.path}>{item.name}</Link></li>)
                    })}
                  </ul>
                </li>)
            } else {
              return (
                <li>
                  <Link to={menuItens[0].path} className=" waves-effect">
                    <i className={`fas ${section.icon} `}/>
                    <span>{ menuItens[0].name }</span>
                  </Link>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default SidebarContent
