import React from 'react'
import { LayoutProvider } from './LayoutProvider'
import { AuthProvider } from './AuthContext'
import { FeedbackProvider } from './FeedbackProvider'

const AppProvider: React.FC = ({ children }) => {
  return (
    <FeedbackProvider>
      <AuthProvider>
        <LayoutProvider>
          { children }
        </LayoutProvider>
      </AuthProvider>
    </FeedbackProvider>
  )
}

export default AppProvider
