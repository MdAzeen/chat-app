import React, { useCallback } from 'react'
import {Button,Icon,Drawer,Alert} from 'rsuite'
import Dashboard from '.';
import { useMediaQuery, useModalState } from '../../misc/custom-hook'
import { auth } from '../../misc/firebase';

function DashboardToggle() {
    const {isOpen,close,open}=useModalState();
   const isMobile=useMediaQuery('(max-width: 992px)')
   const onSignOut=useCallback(()=>{
       auth.signOut();
       Alert.info('Signed Out',4000);
       close();
   },[close]);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
    <Button block color="blue" onClick={open}>
        <Icon icon="dashboard"/> Dashboard
     </Button>
     <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut}/>
     </Drawer>
     </>
  )
}

export default DashboardToggle
