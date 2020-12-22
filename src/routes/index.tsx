import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'
import Dashboard from '../views/pages/Dashboard'
import Login from '../views/pages/Login'
import ListProducts from '../views/pages/Products/ListProducts'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={'/login'} exact component={Login} />
      <Route path={'/produtos/lista'} isPrivate={true} exact component={ListProducts} />
      <Route path={'/'} exact isPrivate={true} component={Dashboard} />
    </Switch>
  )
}

export default Routes
