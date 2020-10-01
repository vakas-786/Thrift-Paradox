import React from 'react'
import { Row, Col } from 'reactstrap'
import '../App.css'


class Sorry extends React.Component {

    render() {
        return(
            <>
            <h2 id='sorry-heading' className='text-center'>Woops! Looks Like You Don't Have Any Lottery Tokens Yet</h2>
            <Row style={{padding: '5px'}} className="justify-content-md-center">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
            <img src= {require('../images/download.svg')} alt='sorry' />
            </Col>
            </Row>
            </>

        )
    }
}

export default Sorry