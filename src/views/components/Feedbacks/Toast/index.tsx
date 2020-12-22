import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export type ToastTypes = 'error' | 'warning' | 'info' | 'success'

export interface ToastData {
  open: boolean
  type: ToastTypes
  message: string
}

export interface ToastProps extends ToastData{
  onClose: () => void
}

export const toastDefaultData: ToastData = {
  open: false,
  message: '',
  type: 'success'
}

const Toast: React.FC<ToastProps> = ({ open, type, message, onClose }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Snackbar open={ open } autoHideDuration={6000} onClose={() => onClose()}>
        <Alert severity={type} onClose={() => onClose()}>
          { message }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Toast
