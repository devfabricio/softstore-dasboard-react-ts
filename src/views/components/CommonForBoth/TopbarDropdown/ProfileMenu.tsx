import React, { useState } from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import { Link } from 'react-router-dom'

// users
import userAvatar from '../../../../assets/images/profile-avatar.png'
import { useAuth } from '../../../context/AuthContext'
import { s3BaseUrl } from '../../../../services/aws/config'

const ProfileMenu: React.FC = () => {
  // Declare a new state variable, which we'll call "menu"

  const { administrator } = useAuth()
  const [menu, setMenu] = useState(false)

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
            src={administrator.profileImg ? `${s3BaseUrl}/${administrator.profileImg}` : userAvatar}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ml-2 mr-1">{administrator.name}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag="a" href="/perfil/editar">
            {' '}
            <i className="bx bx-user font-size-16 align-middle mr-1"/>
            Editar Perfil
          </DropdownItem>
          <DropdownItem tag="a" href="/perfil/alterar-foto">
            <i className="bx bx-user-circle font-size-16 align-middle mr-1"/>
            Alterar Foto de Perfil
          </DropdownItem>
          <DropdownItem tag="a" href="/perfil/alterar-senha">
            <i className="bx bx-lock font-size-16 align-middle mr-1"/>
            Alterar Senha
          </DropdownItem>
          <div className="dropdown-divider"/>
          <DropdownItem tag="a" href="#">
            <i className="bx bx-user-plus font-size-16 align-middle mr-1"/>
            Adicionar Administrador
          </DropdownItem>
          <div className="dropdown-divider"/>
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"/>
            Sair
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default ProfileMenu
