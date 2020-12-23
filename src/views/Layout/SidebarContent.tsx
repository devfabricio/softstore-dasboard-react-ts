import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import MetisMenu from 'metismenujs'

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
          <li className="menu-title">Menu</li>
          <li>
            <Link to="/#" className="waves-effect">
              <i className="bx bx-home-circle"/>
              <span className="badge badge-pill badge-info float-right">
                03
              </span>
              <span>Dashboards</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <Link to="/dashboard">Default</Link>
              </li>
              <li>
                <Link to="/dashboard-saas">Saas</Link>
              </li>
              <li>
                <Link to="/dashboard-crypto">Crypto</Link>
              </li>
            </ul>
          </li>

          <li className="menu-title">Apps</li>

          <li>
            <Link to="/calendar" className=" waves-effect">
              <i className="bx bx-calendar"/>
              <span>Calendar</span>
            </Link>
          </li>

          <li>
            <Link to="/chat" className=" waves-effect">
              <i className="bx bx-chat"/>
              <span className="badge badge-pill badge-success float-right">
                New
              </span>
              <span>Chat</span>
            </Link>
          </li>

          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <i className="bx bx-store"/>
              <span>Produtos</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <Link to="/produtos/lista">Lista de Produtos</Link>
              </li>
              <li>
                <Link to='/produtos/novo'>Adicionar Produto</Link>
              </li>
              <li>
                <Link to="/ecommerce-orders">Adicionar Categorias</Link>
              </li>
              <li>
                <Link to="/ecommerce-orders">Ofertas</Link>
              </li>
              <li>
                <Link to="/ecommerce-orders">Adicionar Oferta</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <i className="bx bx-bitcoin"/>
              <span>Vendas</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <Link to="/crypto-wallet">Pedidos Realizados</Link>
              </li>
              <li>
                <Link to="/crypto-buy-sell">Vendas Concretizadas</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <i className="bx bx-receipt"/>
              <span>Financeiro</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <Link to="/invoices-list">Faturamento mensal</Link>
              </li>
              <li>
                <Link to="/invoices-detail">Faturamento anual</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <i className="bx bx-briefcase-alt-2"/>
              <span>Clientes</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <Link to="/projects-grid">Clientes cadastrados</Link>
              </li>
              <li>
                <Link to="/projects-list">Últimas compras</Link>
              </li>
              <li>
                <Link to="/projects-overview">
                  Project Overview
                </Link>
              </li>
              <li>
                <Link to="/projects-create">Create New</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <i className="bx bx-task"/>
              <span>Publicações</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <Link to="/tasks-list">Nova Publicação</Link>
              </li>
              <li>
                <Link to="/tasks-kanban">Lista de Publicações</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <i className="bx bxs-user-detail"/>
              <span>Loja</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <Link to="/contacts-grid">Depoimentos</Link>
              </li>
              <li>
                <Link to="/contacts-list">Redes Sociais</Link>
              </li>
              <li>
                <Link to="/contacts-profile">Sobre a Loja</Link>
              </li>
              <li>
                <Link to="/contacts-profile">Informações de Contato</Link>
              </li>
              <li>
                <Link to="/contacts-profile">Endereço</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default SidebarContent
