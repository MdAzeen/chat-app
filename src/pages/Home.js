import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../Components/Sidebar';
import { RoomProvider } from '../context/room.context';

function Home() {
  return (
    <RoomProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          <Col xs={24} md={8} className="h-100">
            <Sidebar />
          </Col>
        </Row>
      </Grid>
    </RoomProvider>
  );
}

export default Home;
