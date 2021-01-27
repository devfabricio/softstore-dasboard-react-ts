import React from 'react'
import { Link } from 'react-router-dom'
import { UncontrolledTooltip } from 'reactstrap'
import { CategoryData } from '../../../../../services/api/categories'
import { CategoryRelationshipResponse } from '../../../../../services/api/category-relationship'

interface CategoryTableRowProps {
  categoryRelationship: CategoryRelationshipResponse
  category: CategoryData
  handleDeleteCategory: (id: string) => void
  index: number
}

const CategoryTableRow: React.FC<CategoryTableRowProps> = ({
  category, categoryRelationship,
  index, handleDeleteCategory
}) => {
  const hasProducts = categoryRelationship.count > 0
  const level: number = categoryRelationship.level!
  let trace = 0
  const traceArr = ['']
  while (trace < level) {
    traceArr.push('-')
    trace++
  }
  return (<tr key={category._id}>
    <td>{index + 1}</td>
    <td><Link to={''}>
      {traceArr.map((trace, index) => {
        return <span key={index}>{trace} </span>
      })}
      {category.name}</Link></td>
    <td>{category.slug}</td>
    <td>{categoryRelationship.count}</td>
    <td>
      <Link to={`/categoria/${category._id}`} className="mr-3 text-primary">
        <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip" />
        <UncontrolledTooltip placement="top" target="edittooltip">
          Edit
        </UncontrolledTooltip>
      </Link>
      <Link to="#" className="text-danger" onClick={(e) => {
        e.preventDefault()
        console.log('delete category')
        handleDeleteCategory(category._id)
      }
      }>
        <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip" />
        <UncontrolledTooltip placement="top" target="deletetooltip" style={hasProducts ? { opacity: 0.3, cursor: 'unset' } : {}}>
          Delete
        </UncontrolledTooltip>
      </Link>
    </td>
  </tr>)
}

export default CategoryTableRow
