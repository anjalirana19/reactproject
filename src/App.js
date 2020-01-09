/*import React, { Component } from 'react';

import './style.css';
import LeftBox from './LeftBox';
import RightBox from './RightBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      city:'',
      temp:'',
      weather:'',
      wind:'',
      humidity:'',
      pressure:'',
      maxtemp:'',
      mintemp:'',
      sunrise:'',
      sunset:'',
      found: false
     }
  }
  setCity=(event)=>{
    this.setState({
     city:event.target.value
    })

  }
  setApp=async()=>{

    this.setState({
      temp: ''
    });

    console.log(this.state.city)
    // console.log(this.state.name)
    const appId='df541d85652a12126024d33126c5be22';
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${appId}&units=metric`);
    console.log(response); //returns response stream 
    const myJson = await response.json();
    const x=new Date(myJson.sys.sunrise);
    console.log(myJson);
  
    console.log(x);
    this.setState({
     temp: myJson.main.temp,
      weather:myJson.weather.description,
      found: true
    })
  }
  render() { 
    return (
      
      <div>
        <div className='header'>
        Weather App</div>
        
        <center><input className="name" onChange={this.setCity} placeholder="Enter City Name.." value={this.state.city}/ >
        <button className="btn" onClick={this.setApp}>Search</button></center>
        <center>

        {this.state.found === true
        ?
          <div className="show">  
            <div>
              <LeftBox temp={this.state.temp}/><RightBox/>
              {this.state.temp !== ''
                ? <h1 className="tempValue">{this.state.temp} <sup>0</sup></h1>
                : <span className="searchTxt">Searching City name...</span>
              }
            
            </div>

            <div>
              {/* <h1>Weather:{this.state.weather}</h1><br/> }
            </div>
          </div>
        : null
        }

        
        {this.state.found === true
        ?
          <div className="show">  
            <div>
              
              {this.state.temp !== ''
                ? <h1 className="tempValue">{this.state.temp} <sup>0</sup></h1>
                : <span className="searchTxt">Searching City name...</span>
              }
            
            </div>

            <div>
              {/* <h1>Weather:{this.state.weather}</h1><br/> }
            </div>
          </div>
        : null
        }
        
        </center>
        </div>
      );
  }
}
 
export default App;*/
import React, {Component} from 'react';

import logo from './logo.svg';
import LeftBox from './LeftBox';
import RightBox from './RightBox';

import './style.css';
import xyz from './Capture.jpg';
import { thisExpression } from '@babel/types';

class App extends Component
{
	constructor()
	{
		super() ;
		this.state = {

			city : '',
			country : '',
			date : '',
			temp : '',
			weather : '',
			wind : '',
			humidity : '',
			pressure : '',
			max : '',
			min : '',
			sunrise : '',
			sunset : '',
			icon : undefined ,
			show : false,
      currentComment : '',
			comment : [],
      countComment : 0,
      cityNameFound: true,
      // found:true,
      isShowing :false,
      cityNameNotFound: false,
      
      // icon:''
    }
    this.searchBox=this.searchBox.bind(this);
	}

	setCity = (event) => {
		this.setState({
      city : event.target.value,
      show:false
		})
		console.log(this.state.city) ;
	}

	api = async (name) => {
		const API_KEY='df541d85652a12126024d33126c5be22' ;
		const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`) ;
    const myJson = await response.json() ;
    console.log(response) ;
    if(response.status == 404)
    {
      this.setState({ cityNameNotFound: true });
      return 404 ;
    }
    else{
    console.log(myJson) ;
    return myJson ;
    }
	}

	setComment = (event) => {
		this.setState ({
      currentComment : event.target.value
      
    })
    console.log(this.state.comment) ;
	}
  
	search = async () => {

    this.setState({ isShowing: true,cityNameNotFound:false});

    const Json = await this.api(this.state.city) ;
    console.log(Json) ;
    if(Json != 404)
    {
    this.object=Json;
    
   
    
		this.setState ({
      sear : true,
      cityNameFound:true,
			temp : Json.main.temp,
			pressure : Json.main.pressure,
			humidity : Json.main.humidity,
			max : Json.main.temp_max,
			min : Json.main.temp_min,
			weather : Json.weather[2],
			sunrise : '',
			sunset : '',
			wind : Json.wind.speed,
			country : Json.sys.country,
			icon : Json.weather.icon,
      show : true,
      isShowing: false
    })
  }
  else
  {
    this.setState ({
      cityNameFound : false,
      show:false
    })
  }
  }
  
  postComment = () => {
    this.setState({
      comment : [...this.state.comment, this.state.currentComment],
      countComment : this.state.countComment + 1,
      currentComment:''
    })
  }
  searchBox()
  {
    if(this.state.isShowing)
    {
      return (
        <div className={'searchBox'}>
         <span className={'asp'}>{(this.state.cityNameNotFound) ? 'City Not Found' : 'Searching City name...'}</span>
        </div>
      );
    }
    else
    {
      return <div></div>
    }
  }
	render () {
  
    let entries = this.state.comment.map((eachElm)=>(
      //<div>
       
      <p className = "spa1"><img className = "image" src={xyz} height="18px" width="15px"/> {eachElm}</p>
      //</div>
    ))
   
	return (
		<div>
			<div className = "header"><span className="heading">Weather App</span></div>
			<center><input className = "name" onChange = {this.setCity} value = {this.state.city} placeholder = "Enter City Name..."/>

			<button className = "btn" onClick = {this.search}>Search</button></center>
      


      {this.state.show &&
        <div className = "show">
        <div>
        <LeftBox temp={this.state.temp} object={this.object}/>
        </div>
        <div>
        <RightBox wind={this.state.wind} object={this.object}/>
          </div>
      </div>
      }

      
    
    <br/>
    <this.searchBox />
    {/* {!this.state.cityNameFound && 
      <div className = "comment">
        Invalid City Name
        </div>
    } */}
    
    {this.state.show && 
    <div className = "comment">
				<textarea  cols="10"className = "name1" onChange = {this.setComment} placeholder = "Enter your comment here..." value = {this.state.currentComment}/>

				<div><button className = "btn1" onClick = {this.postComment}>Comment</button></div>
  
				<div>
					<p className="spa">Comments ({this.state.countComment})</p>
          {entries}
				</div>
      </div>
    }
		</div>
	)}
}


export default App;
