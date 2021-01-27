import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import getCroppedImg from './crop'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    background: '#333',
    marginTop: 12,
    [theme.breakpoints.up('sm')]: {
      height: 400
    }
  },
  cropButton: {
    background: '#33658A',
    flexShrink: 0,
    marginLeft: 16,
    marginTop: 12
  },
  controls: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center'
  },
  sliderLabel: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 65
    }
  },
  slider: {
    color: '#33658A'
  }
}))

const CropImage = (props: any) => {
  const classes = useStyles()
  // https://codesandbox.io/s/q8q1mnr01w

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        props.source,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', croppedImage)
      props.setCroppedImage(croppedImage)
      //
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  return (
        <div>
            <div className={classes.cropContainer}>
                <Cropper
                    image={props.source}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className={classes.controls}>
                <div className={classes.sliderContainer}>
                    <Typography
                        variant="overline"
                        classes={{ root: classes.sliderLabel }}
                    >
                        Zoom
                    </Typography>

                </div>
                <Button
                    onClick={showCroppedImage}
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.cropButton }}
                >
                    Pronto!
                </Button>
            </div>
        </div>
  )
}

export default CropImage
