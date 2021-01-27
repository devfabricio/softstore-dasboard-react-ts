import React from 'react'
import { Table as Tablestrap } from 'reactstrap'
interface TableProps {
  tableHeader: string[]
}

const Table: React.FC<TableProps> = ({ tableHeader, children }) => {
  return (
    <div className="table-responsive">
      <Tablestrap className="table mb-0">
        <thead>
        <tr>
          {tableHeader.map((title, index) => {
            return <th key={index}>{title}</th>
          })}
        </tr>
        </thead>
        <tbody>
        {children}
        </tbody>
      </Tablestrap>
    </div>
  )
}

export default Table
