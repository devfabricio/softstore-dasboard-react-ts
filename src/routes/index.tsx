import React from 'react'
import { Switch } from 'react-router-dom'
import { pages } from '../data/pages'
import Route from './Route'
import Login from '../views/pages/Login'
import { useAuth } from '../views/context/AuthContext'
import EditProfile from '../views/pages/Profile/EditProfile'
import ChangePassword from '../views/pages/Profile/ChangePassword'
import ChangeProfilePhoto from '../views/pages/Profile/ChangeProfilePhoto'
import EditProduct from '../views/pages/Products/EditProduct'
import EditCategory from '../views/pages/Products/EditCategory'

const Routes: React.FC = () => {
  const { administrator } = useAuth()
  if (administrator) {
    return (
      <Switch>
        {pages.map((page, index) => {
          return <Route key={index} path={page.path} isPrivate={page.isPrivate} exact component={page.component} />
        })}
        <Route path={'/produto/:id'} exact isPrivate={true} component={EditProduct} />
        <Route path={'/categoria/:id'} exact isPrivate={true} component={EditCategory} />
        <Route path={'/perfil/editar'} isPrivate={true} exact component={EditProfile} />
        <Route path={'/perfil/alterar-senha'} isPrivate={true} exact component={ChangePassword} />
        <Route path={'/perfil/alterar-foto'} isPrivate={true} exact component={ChangeProfilePhoto} />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path={'/'} exact component={Login} />
      </Switch>
    )
  }
}

export default Routes
