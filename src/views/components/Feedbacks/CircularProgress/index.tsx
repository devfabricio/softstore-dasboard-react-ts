import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CircularProgress as Progress } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  })
)

const CircularProgress: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Progress />
    </div>
  )
}

export default CircularProgress
