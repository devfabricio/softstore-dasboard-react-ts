import React from 'react'
import { LayoutProvider } from './LayoutProvider'
import { AuthProvider } from './AuthContext'

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <LayoutProvider>
        { children }
      </LayoutProvider>
    </AuthProvider>
  )
}

export default AppProvider
