import React, { createContext, useCallback, useContext, useState } from 'react'
import Toast, { ToastData, ToastTypes, toastDefaultData } from '../components/Feedbacks/Toast'

interface FeedbackContextData {
  openToast: (message: string, type: ToastTypes) => void
}

const FeedbackContext = createContext<FeedbackContextData>({} as FeedbackContextData)

const FeedbackProvider: React.FC = ({ children }) => {
  const [toastData, setToastData] = useState<ToastData>(toastDefaultData)

  const openToast = useCallback((message: string, type: ToastTypes) => {
    setToastData({
      open: true,
      message: message,
      type: type
    })
  }, [])

  const closeToast = useCallback(() => {
    setToastData(toastDefaultData)
  }, [])

  return (<FeedbackContext.Provider value={{ openToast }}>
    {children}
    <Toast {...toastData} onClose={closeToast} />
  </FeedbackContext.Provider>)
}

const useFeedback = () => {
  const context = useContext(FeedbackContext)

  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider')
  }

  return context
}

export { FeedbackProvider, useFeedback }
