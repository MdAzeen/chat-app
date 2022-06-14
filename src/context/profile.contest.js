import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [isLoading,setisLoading]=useState(true);
  useEffect(() => {
    let userRef;
    const authUnSub=auth.onAuthStateChanged(AuthObj => {
      if (AuthObj) {
       userRef=database.ref(`/profiles/${AuthObj.uid}`)
       userRef.on('value', snap => {
          const { name, createdAt } = snap.val();
          const data = {
            name,
            createdAt,
            uid: AuthObj.uid,
            email: AuthObj.email,
          };
          setProfile(data);
          setisLoading(false);
        });
      } else {
        if(userRef){
          userRef.off();
        }
        setProfile(null);
        setisLoading(false);
      }
    });
    return ()=>{
      authUnSub()
    }
  }, []);
  return (
    <ProfileContext.Provider value={{isLoading,profile}}>
      {children}
    </ProfileContext.Provider>
  );
}
export const useProfile = () => useContext(ProfileContext);
