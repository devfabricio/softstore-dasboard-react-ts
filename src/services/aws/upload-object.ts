import s3 from './index'

const albumBucketName = 'saboreio-storage'

export const uploadObjectOnS3 = async (file: File, key: string) => {
  try {
    const upload = new s3.ManagedUpload({
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
