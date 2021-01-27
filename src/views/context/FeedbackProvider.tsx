import React, { createContext, useCallback, useContext, useState } from 'react'
import Toast, { ToastData, ToastTypes, toastDefaultData } from '../components/Common/Feedbacks/Toast'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

interface FeedbackContextData {
  openToast: (message: string, type: ToastTypes) => void
  showBackdrop: () => void
  dismissBackdrop: () => void
}

const FeedbackContext = createContext<FeedbackContextData>({} as FeedbackContextData)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff'
    }
  })
)

const FeedbackProvider: React.FC = ({ children }) => {
  const [toastData, setToastData] = useState<ToastData>(toastDefaultData)
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const classes = useStyles()

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

  const showBackdrop = useCallback(() => {
    setOpenBackdrop(true)
  }, [])

  const dismissBackdrop = useCallback(() => {
    setOpenBackdrop(false)
  }, [])

  return (<FeedbackContext.Provider value={{ dismissBackdrop, openToast, showBackdrop }}>
    {children}
    <Toast {...toastData} onClose={closeToast} />
    <Backdrop className={classes.backdrop} open={openBackdrop} onClick={dismissBackdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
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
