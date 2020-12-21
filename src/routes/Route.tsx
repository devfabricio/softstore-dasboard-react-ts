import React from 'react'
import * as Router from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface RouteProps extends Router.RouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

const Route : React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { administrator } = useAuth()
  return <Router.Route {...rest} render={() => {
    return isPrivate === !!administrator ? (<Component />) : <Router.Redirect to={{ pathname: isPrivate ? '/login' : '/' }}/>
  }}/>
}

export default Route
