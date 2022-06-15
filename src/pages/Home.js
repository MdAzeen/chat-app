import React from 'react'
import { Col, Grid, Row } from 'rsuite'
import Sidebar from '../Components/Sidebar'

function Home() {
  return <Grid fluid className="h-1000">
    <Row>
      <Col xs={24} md={8}>
        <Sidebar />
      </Col>
    </Row>
  </Grid>
  
}

export default Home
