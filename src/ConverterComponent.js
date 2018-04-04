import React, { Component } from 'react';
import {Grid, Row, Col, } from 'react-bootstrap';

class ConverterComponent extends Component{
    
    constructor(props){
        super(props)
        this.state={}
    }

        //for calculating Rub
    calculateRub(){
        if(this.state.rubValue && this.props.rub){
        this.setState({rubResult:  +this.state.rubValue * (+this.props.rub)})
        } else {
        alert('Enter valid RUB')
        }
    }

    //for calculating Usd
    calculateUsd(){
        if(this.state.usdValue && this.props.usd){
        this.setState({usdResult:  +this.state.usdValue * (+this.props.usd)})
        } else {
        alert("Enter valid USD")
        }
    }

    //for saving input Value in state
    onRubInputChange(value) {
        this.setState({rubValue: value})
    }

    onUsdInputChange(value) {
        this.setState({usdValue: value})
    }

    render() {
        return (
            <div className="ConvContainer" style={{marginTop:"20px", border:"1px solid black", paddingTop:"20px", paddingBottom:"20px"}}>
                <Grid>
                    <Row className="show-grid Converter" id="rubConverter">
                    <Col xs={4} >
                        <input type="number" id="rubSource" placeholder="  rub" onChange={(e) => this.onRubInputChange(e.target.value)}/>
                        <span className="glyphicon glyphicon-rub"/>
                    </Col>  
                    <Col xs={1} >
                        <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"/>
                    </Col>
                    <Col xs={4} >  
                        <input  type="number" className="kztTarget" disabled value={this.state.rubResult}/>
                        <span> KZT </span>
                    </Col>
                    <Col xs={3} >  
                        <button type="button" className="btn btn-success" style={{marginLeft:"10px"}} onClick={(e) => this.calculateRub()}> Convert </button>
                    </Col>
                    </Row>
                    
                    <br/>
                    
                    <Row className="show-grid Converter" id="usdConverter">
                    <Col xs={4} >
                        <input type="number" id="usdSource" placeholder="  usd" onChange={(e) => this.onUsdInputChange(e.target.value)}/>
                        <span  className="glyphicon glyphicon-usd" aria-hidden="true"/>
                    </Col>
                    <Col xs={1} >  
                        <span> </span>
                        <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"/>
                        <span> </span>
                    </Col>
                    <Col xs={4} >  
                        <input type="number" className="kztTarget" disabled value={this.state.usdResult}/>
                        <span> KZT </span>
                    </Col>
                    <Col xs={3} >  
                        <button type="button" className="btn btn-success" style={{marginLeft:"10px"}} onClick={(e) => this.calculateUsd()}> Convert </button>
                    </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}


export default ConverterComponent;