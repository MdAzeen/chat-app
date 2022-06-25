import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    let userRef;
    let userStatusRef;
    const authUnSub = auth.onAuthStateChanged(AuthObj => {
      if (AuthObj) {
        userStatusRef = database.ref(`/status/${AuthObj.uid}`);
        userRef = database.ref(`/profiles/${AuthObj.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();
          const data = {
            name,
            createdAt,
            avatar,
            uid: AuthObj.uid,
            email: AuthObj.email,
          };
          setProfile(data);
          setisLoading(false);
          database.ref('.info/connected').on('value', snapshot => {
            if (!!snapshot.val() === false) {
              return;
            }

            userStatusRef
              .onDisconnect()
              .set(isOfflineForDatabase)
              .then(() => {
                userStatusRef.set(isOnlineForDatabase);
              });
          });
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        if (userStatusRef) {
          userStatusRef.off();
        }
        database.ref('.info/connected').off();
        setProfile(null);
        setisLoading(false);
      }
    });
    return () => {
      authUnSub();
      database.ref('.info/connected').off();
      if (userRef) {
        userRef.off();
      }
      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, []);
  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
}
export const useProfile = () => useContext(ProfileContext);
