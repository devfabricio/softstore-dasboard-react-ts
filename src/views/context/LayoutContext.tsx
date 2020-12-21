import React, { createContext, useCallback, useContext, useState } from 'react'

interface LayoutContextData {
  changeLayoutWidth: (width: number) => void,
  changeSidebarTheme: (theme: string) => void,
  changeSidebarType: (theme: string, isMobile?: boolean) => void,
  changeTopbarTheme: (theme: string) => void,
  showSidebar: (isopen: boolean) => void,
  showRightSidebarAction: (isopen: boolean) => void,
  toggleLeftmenu: (isopen: boolean) => void,
  layoutWidth: number,
  sidebarTheme: string,
  topbarTheme: string
  sidebarType: string,
  isMobile: boolean,
  sidebarIsOpen: boolean
  rightSidebarIsOpen: boolean,
  leftMenuIsOpen: boolean
}

const LayoutContext = createContext<LayoutContextData>({} as LayoutContextData)

const FeedbackProvider: React.FC = ({ children }) => {
  const [layoutWidth, setLayoutWidth] = useState(0)
  const [sidebarTheme, setSidebarTheme] = useState('')
  const [topbarTheme, setTopbarTheme] = useState('')
  const [sidebarType, setSidebarType] = useState('')
  const [isMobile] = useState(false)
  const [rightSidebar, setRightSidebar] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [leftmenu, setLeftmenu] = useState(false)

  const changeLayoutWidth = useCallback((width: number) => {
    setLayoutWidth(width)
  }, [])

  const changeSidebarTheme = useCallback((theme: string) => {
    setSidebarTheme(theme)
  }, [])

  const changeSidebarType = useCallback((sidebarType: string, isMobile?: boolean) => {
    setSidebarType(sidebarType)
  }, [])

  const changeTopbarTheme = useCallback((topbarTheme: string) => {
    setTopbarTheme(topbarTheme)
  }, [])

  const showRightSidebarAction = useCallback((isopen: boolean) => {
    setRightSidebar(isopen)
  }, [])

  const showSidebar = useCallback((isopen: boolean) => {
    setSidebar(isopen)
  }, [])

  const toggleLeftmenu = useCallback((isopen: boolean) => {
    setLeftmenu(isopen)
  }, [])

  return (<LayoutContext.Provider value={{
    changeLayoutWidth,
    changeSidebarTheme,
    changeSidebarType,
    changeTopbarTheme,
    showSidebar,
    showRightSidebarAction,
    toggleLeftmenu,
    layoutWidth,
    sidebarTheme,
    topbarTheme,
    sidebarType,
    isMobile,
    sidebarIsOpen: sidebar,
    rightSidebarIsOpen: rightSidebar,
    leftMenuIsOpen: leftmenu
  }}>
    {children}
  </LayoutContext.Provider>)
}

const useLayout = () => {
  const context = useContext(LayoutContext)

  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider')
  }

  return context
}

export { FeedbackProvider, useLayout }
