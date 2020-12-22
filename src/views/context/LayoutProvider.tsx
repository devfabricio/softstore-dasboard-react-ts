import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

interface LayoutContextData {
  changeLayout: (layout: string) => void,
  changeLayoutWidth: (width: string) => void,
  changeSidebarTheme: (theme: string) => void,
  changeSidebarType: (theme: string, isMobile?: boolean) => void,
  changeTopbarTheme: (theme: string) => void,
  changePreloader: (isPreloader: boolean) => void
  showSidebar: (isopen: boolean) => void,
  showRightSidebarAction: (isopen: boolean) => void,
  toggleLeftmenu: (isopen: boolean) => void,
  layoutType: string,
  layoutWidth: string,
  sidebarTheme: string,
  topbarTheme: string
  sidebarType: string,
  isMobile: boolean,
  sidebarIsOpen: boolean
  rightSidebarIsOpen: boolean,
  leftMenuIsOpen: boolean
  isPreloader: boolean
}

const LayoutContext = createContext<LayoutContextData>({} as LayoutContextData)

const LayoutProvider: React.FC = ({ children }) => {
  const [layoutType, setLayoutType] = useState('vertical')
  const [layoutWidth, setLayoutWidth] = useState('fluid')
  const [sidebarTheme, setSidebarTheme] = useState('dark')
  const [topbarTheme, setTopbarTheme] = useState('dark')
  const [sidebarType, setSidebarType] = useState('default')
  const [isMobile] = useState(false)
  const [rightSidebar, setRightSidebar] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [leftmenu, setLeftmenu] = useState(false)
  const [preloader, setPreloader] = useState(false)

  const changePreloader = useCallback((isPreloader: boolean) => {
    setPreloader(isPreloader)
  }, [])

  const changeLayoutWidth = useCallback((width: string) => {
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

  const changeLayout = useCallback((layout: string) => {
    setLayoutType(layout)
  }, [])

  const changeBodyAttribute = useCallback((attribute, value) => {
    if (document.body) document.body.setAttribute(attribute, value)
    return true
  }, [])

  useEffect(() => {
    if (layoutType === 'horizontal') {
      changeTopbarTheme('dark')
      document.body.removeAttribute('data-sidebar')
      document.body.removeAttribute('data-sidebar-size')
    } else {
      changeTopbarTheme('light')
    }
    changeBodyAttribute('data-layout', layoutType)
  }, [changeBodyAttribute, changeTopbarTheme, layoutType])

  useEffect(() => {
    changeBodyAttribute('data-sidebar', sidebarTheme)
  }, [changeBodyAttribute, sidebarTheme])

  return (<LayoutContext.Provider value={{
    changeLayout,
    changeLayoutWidth,
    changePreloader,
    changeSidebarTheme,
    changeSidebarType,
    changeTopbarTheme,
    showSidebar,
    showRightSidebarAction,
    toggleLeftmenu,
    layoutWidth,
    layoutType,
    sidebarTheme,
    topbarTheme,
    sidebarType,
    isMobile,
    isPreloader: preloader,
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

export { LayoutProvider, useLayout }
