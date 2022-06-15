import React from 'react'
import {Button,Icon,Drawer} from 'rsuite'
import Dashboard from '.';
import { useMediaQuery, useModalState } from '../../misc/custom-hook'

function DashboardToggle() {
    const {isOpen,close,open}=useModalState();
   const isMobile=useMediaQuery('(max-width: 992px)')
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
    <Button block color="blue" onClick={open}>
        <Icon icon="dashboard"/> Dashboard
     </Button>
     <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard />
     </Drawer>
     </>
  )
}

export default DashboardToggle
