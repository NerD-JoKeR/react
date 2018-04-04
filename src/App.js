import React, { Component } from 'react'
import { parseString } from 'xml2js'
import ConverterComponent from './ConverterComponent';
import ExchangeInfoComponent from './ExchangeInfoComponent';

class App extends Component {

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

      let filteredRubArray = itemsArray.filter(kanzharItem => kanzharItem.title[0] === "RUB") // sorted rub[]
      let rubDescription = filteredRubArray[0].description[0] // take description from rub[]

      let filteredUsdArray = itemsArray.filter(someItem => someItem.title[0] === "USD") // sorted usd[]
      let usdDescription = filteredUsdArray[0].description[0] // take descriptionfrom usd[]

      this.setState({items: itemsArray, rub: rubDescription, usd: usdDescription}) // changing state by save items

    })
    .catch(error => {
      console.error("ERROR: \n" + error) // for catching err if we have
    })
  }

  render() {
    
    //let items = this.state && this.state.items
    let items = this.state ? this.state.items : []
    let rub = this.state && this.state.rub
    let usd = this.state && this.state.usd

    return (
      this.state && <div className="App"> 
        <ConverterComponent rub={rub} usd={usd}/>
        <br/>
        <h1> Official exchange rates of National Bank of Republic Kazakhstan </h1>
        <br/>
        <ExchangeInfoComponent items={items}/>
      </div>
    );
  }
}

export default App;
