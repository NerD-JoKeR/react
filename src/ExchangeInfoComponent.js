import React, { Component } from 'react';
import {Grid, Row, Col, Table, thead, th, tbody, tr, td, } from 'react-bootstrap';

    
class ExchangeInfoComponent extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }      
        

    render(){
        return(
        <div className="ExchangeInfoContainer" style={{border:"1px solid green", paddingTop:"20px", paddingBottom:"20px"}}>
        <Grid>
            <Row>
            <Col xs={8} xsOffset={2}>
                <Table striped bordered condensed hover>
                <thead>
                    <tr>
                    <th style={{textAlign: "center"}}>#</th>
                    <th style={{textAlign: "center"}}> Source </th>
                    <th style={{textAlign: "center"}}><span className="glyphicon glyphicon-arrow-right" aria-hidden="true"/></th>
                    <th style={{textAlign: "center"}}> KZT </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.items && this.props.items.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td> <span>{index + 1}.</span> </td> 
                                    <td> <span> 1 {item.title[0]} </span> </td>
                                    <td> <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"/> </td>
                                    <td> <span> {item.description[0]} kzt </span> </td>
                                </tr>   
                            )
                        })
                    } 
                </tbody>
                </Table>
            </Col>
            </Row>
        </Grid>                   
        </div>
        )    
    }  
} 

export default ExchangeInfoComponent;