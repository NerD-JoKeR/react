import React, { Component } from 'react';
import './App.css';
import { parseString } from 'xml2js'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {ratesList:[]};
  }

  componentDidMount(){
    fetch("/rss/rates_all.xml",  {method: 'GET', mode:'cors'}) //GET, POST
    .then(response => response.text())
    .then(responseText => {
      // adding result to JSObject
      let jsonObject = {} 
      parseString(responseText, (error, result) => {
        if(error){
          console.error("ERROR PARSING: " + error)
        } else {
          jsonObject = result
        }
      })
      
      console.log("RESULT: \n" + JSON.stringify(jsonObject))
      let rss = jsonObject.rss;
      let channel = rss.channel;// take from [] -> channel[]
      let channelItem = channel[0] // take from channel[] -> item[]
      let itemsArray = channelItem.item; // take from item[] -> first item[]

      let filteredRubArray = itemsArray.filter(kanzharItem => kanzharItem.title[0] == "RUB") // sorted rub[]
      let rubDescription = filteredRubArray[0].description[0] // take description from rub[]

      let filteredUsdArray = itemsArray.filter(someItem => someItem.title[0] == "USD") // sorted usd[]
      let usdDescription = filteredUsdArray[0].description[0] // take descriptionfrom usd[]

      this.setState({items: itemsArray, rub: rubDescription, usd: usdDescription}) // changing state by save items

    })
    .catch(error => {
      console.error("ERROR: \n" + error) // for catching err if we have
    })
  }

  //for calculating Rub
  calculateRub(){
    if(this.state.rubValue && this.state.rub){
      this.setState({rubResult:  +this.state.rubValue * (+this.state.rub)})
    } else {
      alert('Enter RUB')
    }
  }

  //for calculating Usd
  calculateUsd(){
    if(this.state.usdValue && this.state.usd){
    this.setState({usdResult:  +this.state.usdValue * (+this.state.usd)})
    } else {
      alert("Enter USD")
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
      <div className="App"> 
       <div className="ConvContainer" style={{marginTop:"20px", border:"1px solid black", paddingTop:"20px", paddingBottom:"20px"}}>
          <div id="rubConverter" className="Converter">
            <input type="number" id="rubSource" placeholder="  rub" onChange={(e) => this.onRubInputChange(e.target.value)}/>
            <span> RUB </span>
            <span> ---> </span>
            <input type="number" className="kztTarget" disabled value={this.state.rubResult}/>
            <span> KZT </span>
            <button style={{marginLeft:"10px"}} onClick={(e) => this.calculateRub()}> Convert </button>
          </div>
          <br/>
          <div id="usdConverter" className="Converter">
            <input type="number" id="usdSource" placeholder="  usd" onChange={(e) => this.onUsdInputChange(e.target.value)}/>
            <span> USD </span>
            <span> ---> </span>
            <input type="number" className="kztTarget" disabled value={this.state.usdResult}/>
            <span> KZT </span>
            <button style={{marginLeft:"10px"}} onClick={(e) => this.calculateUsd()}> Convert </button>
          </div>
        </div>
        
        <br/>
        <h1> Official exchange rates of National Bank of Republic Kazakhstan </h1>
        <br/>
        
        <div className="ExchangeInfoContainer" style={{border:"1px solid green", paddingTop:"20px", paddingBottom:"20px"}}>
          {
            this.state.items && this.state.items.map(item => {
              return (
                <div className="ExchangeInfo">
                  <span> 1 {item.title[0]} </span>
                  <span> --> </span>
                  <span> {item.description[0]} kzt </span>
                </div>
              )
            })
          }              
        </div>
      </div>
    );
  }
}

export default App;
