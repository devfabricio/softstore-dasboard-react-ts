import aws from 'aws-sdk'

const bucketRegion = 'us-east-1'

aws.config.update({
  region: bucketRegion,
  secretAccessKey: 'TpROt0qooI4ZgOqBZf9TspKonSsuSUTCVNDo1Ogt',
  accessKeyId: 'AKIA4DTTC4LF5DBY6V75'
})

const s3 = aws.S3

export default s3
