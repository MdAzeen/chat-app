import React,{ createContext,useEffect,useState,useContext} from 'react';
import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helpers';

const RoomContest = createContext();

export function RoomProvider({ children }) {
    const [rooms,setRooms]=useState(null);
    useEffect(()=>{
        const roomListRef=database.ref('rooms');
        roomListRef.on('value',(snap)=>{
            const data=transformToArrWithId(snap.val());
           setRooms(data);
        })
        return ()=>{
            roomListRef.off();
        }
    },[])
  return <RoomContest.Provider value={rooms}>{children}</RoomContest.Provider>;
}

export const useRooms=()=>useContext(RoomContest);
