import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import md5 from 'md5'
import api from '../../services/api'
import { authVerify } from '../../services/api/auth'
import { AdministratorData } from '../../services/api/administrator'

interface LoginCredentials {
  email: string
  password: string
}

interface AuthState {
  token: string,
  administrator: AdministratorData
}

interface AuthContextType {
  administrator: AdministratorData
  updateAdministratorData(administrador: AdministratorData): void
  signIn(credentials: LoginCredentials): Promise<void>
  signOut(): void
}

const firstTokenKey = 'fmt'
const secondTokenKey = 'cdm'
const thirdTokenKey = 'lts'

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState)

  const verifyAuthentication = useCallback(() => {
    const firstTokenItem = localStorage.getItem(firstTokenKey)
    const secondTokenItem = localStorage.getItem(secondTokenKey)
    const thirdTokenItem = localStorage.getItem(thirdTokenKey)

    const token = `${firstTokenItem}.${secondTokenItem}.${thirdTokenItem}`
    const userId = localStorage.getItem('uid')

    if (token && userId) {
      authVerify(token, userId, (data, errorMessage) => {
        if (data) {
          api.defaults.headers.authorization = `Bearer ${token}`
          setData({ token, administrator: data })
        }
      })
    }
  }, [])

  useEffect(() => {
    verifyAuthentication()
  }, [verifyAuthentication])

  const signIn = useCallback(async ({ email, password }: LoginCredentials) => {
    const response = await api.post('administrator/auth', {
      email, password
    })

    const { token, administrator } = response.data
    const arrToken = token.split('.')
    localStorage.setItem('uid', administrator._id)
    localStorage.setItem('token', md5(administrator._id))
    localStorage.setItem(secondTokenKey, arrToken[1])
    localStorage.setItem(firstTokenKey, arrToken[0])
    localStorage.setItem(thirdTokenKey, arrToken[2])
    setData({ token, administrator })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('uid')
    localStorage.removeItem('token')
    localStorage.removeItem(secondTokenKey)
    localStorage.removeItem(firstTokenKey)
    localStorage.removeItem(thirdTokenKey)

    setData({} as AuthState)
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  const updateAdministratorData = useCallback((administrador: AdministratorData) => {
    setData(data => ({ ...data, administrator: administrador }))
  }, [])

  return (<AuthContext.Provider value={{ administrator: data.administrator, updateAdministratorData, signIn, signOut }}>
    {children}
  </AuthContext.Provider>)
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
