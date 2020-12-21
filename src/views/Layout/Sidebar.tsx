import React from 'react'
import SidebarContent from './SidebarContent'
// @ts-ignore
import SimpleBar from 'simplebar-react'

interface SidebarProps {
  type: string
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {props.type !== 'condensed'
            ? (<SimpleBar style={{ maxHeight: '100%' }}><SidebarContent /></SimpleBar>)
            : (<SidebarContent />)}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Sidebar
