import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../../Components/Sidebar';
import { RoomProvider } from '../../context/room.context';
import { useMediaQuery } from '../../misc/custom-hook';
import Chat from './Chat';

function Home() {
  const isDesktop = useMediaQuery(`(min-width: 992px)`);
  const { isExact } = useRouteMatch();

  const canRenderSideBar = isDesktop || isExact;
  return (
    <RoomProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {canRenderSideBar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}
          <Switch>
            <Route exact path="/chats/:chatId">
              <Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>
            <Route>
              { isDesktop && <Col xs={24} md={16} className="h-100">
                <h6 className='text-center mt-page'>Please select chat</h6></Col>}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomProvider>
  );
}

export default Home;
