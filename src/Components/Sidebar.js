import React from 'react'
import CreateRoomBtnModule from './CreateRoomBtnModule'
import DashboardToggle from './dashboard/DashboardToggle'

function Sidebar() {
  return (
    <div className='h-100 pt-2'>
       <div>
         <DashboardToggle />
         <CreateRoomBtnModule/>
       </div>
    </div>
  )
}

export default Sidebar
