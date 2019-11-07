import React, { Component } from 'react'
import {Paper} from '@material-ui/core'
import axios from 'axios'

export default class Relief extends Component {
    constructor(props){
        super(props)
        this.state={
            alerts:[],
            reliefId:'5d8e379ed0bad83c8106dd4e'
        }
    }

    componentDidMount(){
        axios.post('http://localhost:3000/getReliefAlerts',{reliefId:this.state.reliefId},{
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
        return (
            <div class="relief-panel">
                <h1>Relief emergency alerts</h1>

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
