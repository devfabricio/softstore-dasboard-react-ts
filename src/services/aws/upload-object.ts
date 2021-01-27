import S3 from './index'

const albumBucketName = 'saboreio-storage'

export const uploadObjectOnS3 = async (file: File, key: string) => {
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

export const deleteObjectOnS3 = async (imgUrl: string): Promise<void> => {
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
