import React, { Component } from 'react'
import {Paper} from '@material-ui/core'
import axios from 'axios'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            placeName:'',
            placeAsked:'',
            places:[],
            isSafe:0,
            dataCome:false,
            messageH:'',
            messageR:''
        }
    }

    getPlaces=()=>{
        axios.post('http://localhost:3000/places',JSON.stringify({searchedPlace:this.state.placeName}),{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            console.log(res.data)
            this.setState({
                places:res.data.matchedPlaces
            })
        })
    }
    handleChange=(e)=>{
        this.setState({
            placeName:e.target.value
        })
    }
    handleChange2=(e)=>{
        this.setState({
            messageH:e.target.value
        })
    }
    handleChange3=(e)=>{
        this.setState({
            messageR:e.target.value
        })
    }
    verifySafe=(val)=>{
        this.setState({
            placeAsked:val
        })
        axios.post('http://localhost:3000/findWeather',JSON.stringify({lat:val.latitudeCenter,long:val.longitudeCenter}),{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            axios.post('http://localhost:3000/analyzeWeather',JSON.stringify({weather:res.data.weatherData}),{
            headers:{
                'Content-Type': 'application/json'
            }
            }).then((res)=>{
                if(!res.data.danger){
                    this.setState({
                        isSafe:1
                    })

                    axios.post('http://localhost:3000/getHelp',JSON.stringify({lat:val.latitudeCenter,long:val.longitudeCenter}),{
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res)=>{
                        console.log(res.data)
                        this.setState({
                            nearestHealthcare:res.data.nearestHealthcare,
                            nearestRelief:res.data.nearestRelief,
                            dataCome:true
                        })
                    })
                }
                else{
                    this.setState({
                        isSafe:1
                    })

                    axios.post('http://localhost:3000/getHelp',JSON.stringify({lat:val.latitudeCenter,long:val.longitudeCenter}),{
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res)=>{
                        console.log(res.data)
                        this.setState({
                            nearestHealthcare:res.data.nearestHealthcare,
                            nearestRelief:res.data.nearestRelief,
                            dataCome:true
                        })
                    })
                }
            })
        })
    }
    sendAlertHealthcare=(id)=>{
        let d={
            healthcareId:id,
            message:this.state.messageH,
            ...this.state.placeAsked
        }
        console.log(d)
        axios.post('http://localhost:3000/sendAlertHealthcare',JSON.stringify(d),{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>{
            console.log(res)
        })
    }
    sendAlertRelief=(id)=>{
        let d={
            reliefId:id,
            message:this.state.messageR,
            ...this.state.placeAsked
        }
        console.log(d)
        axios.post('http://localhost:3000/sendAlertRelief',JSON.stringify(d),{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>{
            console.log(res)
        })
    }
    render() {
        return (
            <div className="homeComponent">
                <h1 className="mainHeading">CalSafe</h1>
                <p className="tagline">Take precautions before it is too late.</p>

                <input id="searchPlace" type="text" onChange={(e)=>{this.handleChange(e)}}/><br></br>
                <button onClick={this.getPlaces} id="check-btn">Find place</button>

                {this.state.isSafe===1 && <p id="weather-result-1">Weather is over the limits.</p>}
                {this.state.isSafe===-1 && <p id="weather-result-2">Weather is under safe limits.</p>}
                <br></br><br></br>

                {
                    this.state.places.length>0 && this.state.places.map((val,ind)=>(
                        <div className="margin-bottom" onClick={()=>{this.verifySafe(val)}}>
                            <p className="oneplace">{val.name}</p>
                        </div>
                    ))
                }

                {this.state.dataCome && <div id="nearestHealthcare">
                    <p className="nearest-heading">Nearest healthcare centre</p>
                    <Paper className="nearest-info">
                        <p class="health-alert-text"><span class="heading">Name:</span> {this.state.nearestHealthcare.name}</p>
                        <p class="health-alert-text"><span class="heading">Services:</span> {this.state.nearestHealthcare.services}</p>
                        <p class="health-alert-text"><span class="heading">Operating Hours:</span> {this.state.nearestHealthcare.operatingHours}</p>
                        <p class="health-alert-text"><span class="heading">Staff Count:</span> {this.state.nearestHealthcare.staffCount}</p>
                        <p class="health-alert-text"><span class="heading">Transport Offered:</span> {this.state.nearestHealthcare.transportOffered}</p>
                        <p class="health-alert-text"><span class="heading">Contact:</span> {this.state.nearestHealthcare.contact}</p>

                        <textarea className="alert-message" type="text" onChange={(e)=>{this.handleChange2(e)}}></textarea><br></br>

                        <button onClick={()=>{this.sendAlertHealthcare(this.state.nearestHealthcare._id)}} className="send-alert-btn">Send alert</button>
                    </Paper>
                </div>}

                {this.state.dataCome && <div id="nearestRelief">
                    <p className="nearest-heading">Nearest relief centre</p>
                    <Paper className="nearest-info">
                        <p class="health-alert-text"><span class="heading">Name:</span> {this.state.nearestRelief.name}</p>
                        <p class="health-alert-text"><span class="heading">Helper Count:</span> {this.state.nearestRelief.helperCount}</p>
                        <p class="health-alert-text"><span class="heading">Response Time:</span> {this.state.nearestRelief.responseTime}</p>
                        <p class="health-alert-text"><span class="heading">Amenities:</span> {this.state.nearestRelief.amenities}</p>
                        <p class="health-alert-text"><span class="heading">Transport Offered:</span> {this.state.nearestRelief.transportOffered}</p>
                        <p class="health-alert-text"><span class="heading">Contact:</span> {this.state.nearestRelief.contact}</p>

                        <textarea className="alert-message" type="text" onChange={(e)=>{this.handleChange3(e)}}></textarea><br></br>

                        <button onClick={()=>{this.sendAlertRelief(this.state.nearestRelief._id)}} className="send-alert-btn">Send alert</button>
                    </Paper>
                </div>}
            </div>
        )
    }
}
