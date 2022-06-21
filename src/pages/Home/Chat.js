import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import ChatTop from '../../Components/Chat-window/top';
import ChatBottom from '../../Components/Chat-window/bottom';
import Messages from '../../Components/Chat-window/messages';
import { useRooms } from '../../context/room.context';
import { CurrentRoomProvider } from '../../context/current-room.context';

function Chat() {
  const { chatId } = useParams();
  const rooms = useRooms();
  if (!rooms) {
    return <Loader center vertical size="md" context="Loading" speed="slow" />;
  }
  const currentRoom = rooms.find(room => room.id === chatId);
  if (!currentRoom) {
    return <h6 className="text-center mt-page">Chat {chatId} Not Found</h6>;
  }
  const { name, description } = currentRoom;
  const currentRoomData = {
    name,
    description,
  };
  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
}

export default Chat;
