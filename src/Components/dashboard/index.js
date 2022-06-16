import React from 'react';
import { Button, Drawer, Divider,Alert} from 'rsuite';
import { useProfile } from '../../context/profile.contest';
import { database } from '../../misc/firebase';
import EditableInput from './EditableInput';
import ProviderBlock from './ProviderBlock';

function Dashboard({ onSignOut }) {
  const { profile } = useProfile();
  const onSave =  async (newData) => {
    const userNickNameRef=database.ref(`/profiles/${profile.uid}`).child('name');
    try{
        await userNickNameRef.set(newData);
        Alert.success('NickName has been updated',4000);
    } catch(err)
    {
       Alert.error(err.message,4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey,{profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">NickName</h6>}
        />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          SignOut
        </Button>
      </Drawer.Footer>
    </>
  );
}

export default Dashboard;
