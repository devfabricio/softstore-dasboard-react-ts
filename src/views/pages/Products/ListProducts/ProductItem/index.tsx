import React from 'react'
import { Card, CardBody, Col, UncontrolledTooltip } from 'reactstrap'
import { s3BaseUrl } from '../../../../../services/aws/config'
import { Link, useHistory } from 'react-router-dom'
import { ProductDataResponse } from '../../../../../services/api/products'
import { formatPrice } from '../../../../../utils/format-price'

interface ProductItemProps {
  product: ProductDataResponse
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const history = useHistory()

  return (
    <Col xl="4" sm="6">
      <Card
        className={'product'}
        onClick={() =>
          history.push(`/produtos/${product._id}`)
        }
      >
        <CardBody>
          <div className="product-img position-relative">
            {
              product.oldPrice !== 0
                ? (<div className="avatar-sm product-ribbon">
                    <span className="avatar-title rounded-circle  bg-primary">
                      {`-${product.oldPrice}%`}
                    </span>
                  </div>
                  )
                : null}

            <img
              src={`${s3BaseUrl}/${product.thumbImg}`}
              alt=""
              className="img-fluid mx-auto d-block"
            />
          </div>
          <div className="mt-4 text-center">
            <h5 className="mb-3 text-truncate">
              <Link
                to={'/ecommerce-product-detail/' + product._id}
                className="text-dark"
              >
                {product.name}{' '}
              </Link>
            </h5>
            <span className={'product-category'}>{''}</span>
            <h5 className="my-0">
              <span className="text-muted mr-2">
              </span>
              <b>R$ {formatPrice(product.price)}</b>
            </h5>
            <button className="text-danger">
              <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip" />
              <UncontrolledTooltip placement="top" target="deletetooltip"
                                   onClick={() => {}}>
                Delete
              </UncontrolledTooltip>
            </button>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ProductItem
