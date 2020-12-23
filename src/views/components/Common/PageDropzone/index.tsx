import React from 'react'
import Dropzone from 'react-dropzone'
import { Card, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

type AcceptedFile = {file: File, formattedSize: string, preview: string}

interface PageDropzoneProps {
  handleAcceptedFiles: (files: File[]) => void
  acceptedFiles: AcceptedFile[]
}

const PageDropzone: React.FC<PageDropzoneProps> = ({ handleAcceptedFiles, acceptedFiles }) => {
  return (<>
    <Dropzone
      onDrop={acceptedFiles => {
        handleAcceptedFiles(acceptedFiles)
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="dropzone">
          <div
            className="dz-message needsclick"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="dz-message needsclick">
              <div className="mb-3">
                <i className="display-4 text-muted bx bxs-cloud-upload" />
              </div>
              <h4>Drop files here or click to upload.</h4>
            </div>
          </div>
        </div>
      )}
    </Dropzone>
    <div className="dropzone-previews mt-3" id="file-previews">
      {acceptedFiles.map((f, i) => {
        return (
          <Card
            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
            key={i + '-file'}
          >
            <div className="p-2">
              <Row className="align-items-center">
                <Col className="col-auto">
                  <img
                    data-dz-thumbnail=""
                    height="80"
                    className="avatar-sm rounded bg-light"
                    alt={f.file.name}
                    src={f.preview}
                  />
                </Col>
                <Col>
                  <Link
                    to="#"
                    className="text-muted font-weight-bold"
                  >
                    {f.file.name}
                  </Link>
                  <p className="mb-0">
                    <strong>{f.formattedSize}</strong>
                  </p>
                </Col>
              </Row>
            </div>
          </Card>
        )
      })}
    </div>
  </>)
}

export default PageDropzone
