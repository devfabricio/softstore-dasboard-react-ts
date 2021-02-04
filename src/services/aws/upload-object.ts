import s3 from './index'

export interface AWSDataResponse {
  AWSSecretAccessKey: string
  AWSAccessKeyId: string
  AWSBucketRegion: string
}

const albumBucketName = 'saboreio-storage'

export const uploadObjectOnS3 = async (file: File, key: string, awsData: AWSDataResponse) => {
  const S3 = s3(awsData)
  try {
    const upload = new S3.ManagedUpload({
      params: {
        Bucket: albumBucketName,
        Key: key,
        Body: file,
        ACL: 'public-read'
      }
    })
    await upload.promise()
  } catch (error) {
    console.log(error)
  }
}

export const deleteObjectOnS3 = async (imgUrl: string, awsData: AWSDataResponse): Promise<void> => {
  const S3 = s3(awsData)
  try {
    const params = { Bucket: albumBucketName, Key: imgUrl }
    const s3Instance = new S3()
    s3Instance.deleteObject(params, function (err, data) {
      if (err) {
        return new Promise((resolve, reject) => reject(err))
      } else {
        return new Promise(resolve => resolve({}))
      }
    })
  } catch (error) {
    console.log(error)
  }
}
