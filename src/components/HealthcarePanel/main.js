import React, { Component } from 'react'
import {Paper} from '@material-ui/core'
import axios from 'axios'

export default class Healthcare extends Component {
    constructor(props){
        super(props)
        this.state={
            alerts:[],
            healthcareId:'5d8e33d2084a083aac96f922'
        }
    }

    componentDidMount(){
        axios.post('http://localhost:3000/getHealthcareAlerts',{healthcareId:this.state.healthcareId},{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            this.setState({
                alerts:res.data.alerts
            })
        })
    }

    render() {
        console.log(this.state)
        return (
            <div class="health-panel">
                <h1>Healthcare emergency alerts</h1>

                {
                    this.state.alerts.length>0 && this.state.alerts.map((val,ind)=>(
                        <Paper class="health-alert">
                            <p class="health-alert-text"><span class="heading">Name:</span> {val.placeInfo.name}</p>
                            <p class="health-alert-text"><span class="heading">Area:</span> {val.placeInfo.area}</p>
                            <p class="health-alert-text"><span class="heading">Population:</span>{val.placeInfo.population}</p>
                            <p class="health-alert-text"><span class="heading">Message:</span>{val.message}</p>
                        </Paper>
                    ))
                }

            </div>
        )
    }
}
