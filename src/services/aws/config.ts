import { generateFileName } from '../../utils/format-files'

export const s3BaseUrl = 'https://saboreio-storage.s3.amazonaws.com'

interface S3PathInterface {
  fullURL: string
  path: string
  thumbPath: string
  fullThumbURL: string
}

export const getS3Url = (imgPath: string): string => {
  return `${s3BaseUrl}/${imgPath}`
}

export const generateS3ImagePath = (file: File, s3BasePath: string): S3PathInterface => {
  const filename = generateFileName(file)
  const path = `uploads/images/${s3BasePath}/${filename}`
  const thumbPath = `uploads/images/${s3BasePath}/thumbnails/${filename}`
  const fullURL = `${s3BaseUrl}/${path}`
  const fullThumbURL = `${s3BaseUrl}/${thumbPath}`
  return { path, fullURL, thumbPath, fullThumbURL }
}
