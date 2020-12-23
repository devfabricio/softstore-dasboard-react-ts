import React from 'react'
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle
} from 'reactstrap'

interface PageCardProps {
  title: string
  description: string
}

const PageCard: React.FC<PageCardProps> = ({ children, title, description }) => {
  return (<Card>
    <CardBody>
      <CardTitle>{ title }</CardTitle>
      <CardSubtitle className="mb-3">
        { description }
      </CardSubtitle>
      {children}
    </CardBody>
  </Card>)
}

export default PageCard
