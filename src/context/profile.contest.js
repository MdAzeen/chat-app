import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [isLoading,setisLoading]=useState(true);
  useEffect(() => {
    auth.onAuthStateChanged(AuthObj => {
      if (AuthObj) {
        database.ref(`/profiles/${AuthObj.uid}`).on('value', snap => {
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
        setProfile(null);
        setisLoading(false);
      }
    });
  }, []);
  return (
    <ProfileContext.Provider value={{isLoading,profile}}>
      {children}
    </ProfileContext.Provider>
  );
}
export const useProfile = () => useContext(ProfileContext);
