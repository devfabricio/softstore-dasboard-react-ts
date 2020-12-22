import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'
import Dashboard from '../views/pages/Dashboard'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={'/'} component={Dashboard} />
    </Switch>
  )
}

export default Routes
