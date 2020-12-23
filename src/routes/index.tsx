import React from 'react'
import { Switch } from 'react-router-dom'
import { pages } from '../data/pages'
import Route from './Route'
import Login from '../views/pages/Login'
import { useAuth } from '../views/context/AuthContext'

const Routes: React.FC = () => {
  const { administrator } = useAuth()
  if (administrator) {
    return (
      <Switch>
        {pages.map((page, index) => {
          return <Route key={index} path={page.path} isPrivate={page.isPrivate} exact component={page.component} />
        })}
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
