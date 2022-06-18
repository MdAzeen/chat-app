import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader, Nav } from 'rsuite';
import { useRooms } from '../../context/room.context';
import RoomItem from './RoomItem';

function ChatRoomList({ aboveElHeight }) {
  const rooms = useRooms();
  const location = useLocation();
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll h-100"
      style={{
        height: `calc(100%-${aboveElHeight}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="Loading" speed="slow" size="md" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => {
          return (
            <Nav.Item
              componentClass={Link}
              to={`/chats/${room.id}`}
              eventKey={`/chats/${room.id}`}
              key={room.id}
            >
              <RoomItem room={room} />
            </Nav.Item>
          );
        })}
    </Nav>
  );
}

export default ChatRoomList;
