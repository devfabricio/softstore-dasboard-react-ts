import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'

const Transition = React.forwardRef(function Transition (
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const confirmAlertDialogDefault = {
  open: false,
  titleText: '',
  contentText: '',
  positiveText: 'Sim',
  negativeText: 'Cancelar',
  positiveAction: () => {},
  negativeAction: () => {}
}

export interface ConfirmAlertDialogProps {
  open: boolean
  titleText: string
  contentText: string
  positiveText: string
  negativeText: string
  positiveAction: () => void
  negativeAction: () => void
}

const ConfirmAlertDialog: React.FC<ConfirmAlertDialogProps> = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.negativeAction()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.negativeAction()} color="primary">
            {props.negativeText}
          </Button>
          <Button onClick={() => props.positiveAction()} color="primary">
            {props.positiveText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmAlertDialog
