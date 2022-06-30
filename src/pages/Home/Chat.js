import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import { CurrentRoomProvider } from '../../context/current-room.context';
import { transformToArr } from '../../misc/helpers';
import { auth } from '../../misc/firebase';
import { useRooms } from '../../context/room.context';
import Messages from '../../Components/Chat-window/messages';
import Bottom from '../../Components/Chat-window/bottom';
import Top from '../../Components/Chat-window/top';

function Chat() {
  const { chatId } = useParams();

  const rooms = useRooms();

  useEffect(() => {
    window.chatId = chatId;
  }, [chatId]);

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom) {
    return <h6 className="text-center mt-page">Chat {chatId} not found</h6>;
  }

  const { name, description } = currentRoom;

  const admins = transformToArr(currentRoom.admins);
  const fcmUsers = transformToArr(currentRoom.fcmUsers);
  const isAdmin = admins.includes(auth.currentUser.uid);
  const isReceivingFcm = fcmUsers.includes(auth.currentUser.uid);

  const currentRoomData = {
    name,
    description,
    admins,
    isAdmin,
    isReceivingFcm,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <Top />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <Bottom />
      </div>
    </CurrentRoomProvider>
  );
}

export default Chat;