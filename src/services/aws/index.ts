import aws, { S3 } from 'aws-sdk'
import { AWSDataResponse } from './upload-object'

const s3 = (awsData: AWSDataResponse): typeof S3 => {
  aws.config.update({
    region: awsData.AWSBucketRegion,
    secretAccessKey: awsData.AWSSecretAccessKey,
    accessKeyId: awsData.AWSAccessKeyId
  })

  return aws.S3
}

export default s3
