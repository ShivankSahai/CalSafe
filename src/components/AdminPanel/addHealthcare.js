import React, { Component } from 'react'
import axios from 'axios'
import {Typography,TextField,Button,CircularProgress,Snackbar, TextareaAutosize} from '@material-ui/core'

export default class AdminHealthcare extends Component {
    constructor(props){
        super(props)
        this.state={
            lat:0,
            long:0,
            name:'',
            services:'',
            hours:'',
            staff:0,
            transport:'',
            contact:'',
            taking_location:false,
            sending:false,
            message:'Healthcare centre added successfully.',
            open: false,
            vertical: 'top',
            horizontal: 'center'
        }
    }

    take_location=()=>{
        this.setState({
            taking_location:true
        })
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
          console.log("Geolocation is not supported by this browser.")
        }
    }

    showPosition=(position)=> {
        let n={
            lat:position.coords.latitude,
            long:position.coords.longitude
        }

        this.setState({
            lat:n.lat,
            long:n.long,
            taking_location:false
        })
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    handleClick = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    addPlace=()=>{
        this.setState({
            sending:true
        })
        let newPlace={
            latitude:this.state.lat,
            longitude:this.state.long,
            name:this.state.name,
            services:this.state.services,
            hours:this.state.hours,
            staff:this.state.staff,
            transport:this.state.transport,
            contact:this.state.contact
        }
        axios.post('http://localhost:3000/addHealthcare',newPlace,{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            this.setState({
                message:"Healthcare centre added successfully.",
                sending:false
            })
            this.handleClick()
        }).catch((err)=>{
            this.setState({
                message:err,
                sending:false
            })
            this.handleClick()
        })
    }

    render() {
        const { vertical, horizontal, open } = this.state;
        return (
            <div class="addPlaceDiv">
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Healthcare centre added successfully.</span>}
                />
                <h1 className="no-margin-top">Add Healthcare Center</h1>
                <Typography component="p" className="little_big">Enter Latitude</Typography>
                <TextField
                id="outlined-name"
                label="Latitude"
                value={this.state.lat}
                onChange={this.handleChange('lat')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br>
                <Typography component="p" className="little_big">Enter longitude</Typography>
                <TextField
                id="outlined-name"
                label="Longitude"
                value={this.state.long}
                onChange={this.handleChange('long')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br>
                <Typography component="p" className="little_big">Enter name</Typography>
                <TextField
                id="outlined-name"
                label="Name"
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br>
                <Typography component="p" className="little_big">Enter services</Typography>
                <TextField
                id="outlined-name"
                label="Services"
                value={this.state.services}
                onChange={this.handleChange('services')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br>
                <Typography component="p" className="little_big">Enter operating hours</Typography>
                <TextField
                id="outlined-name"
                label="Hours"
                value={this.state.hours}
                onChange={this.handleChange('hours')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br>
                <Typography component="p" className="little_big">Enter staff count</Typography>
                <TextField
                id="outlined-name"
                label="Staff"
                value={this.state.area}
                onChange={this.handleChange('staff')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br>
                <Typography component="p" className="little_big">Enter transportation offered</Typography>
                <TextField
                id="outlined-name"
                label="Transport"
                value={this.state.transport}
                onChange={this.handleChange('transport')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br><Typography component="p" className="little_big">Enter contact details</Typography>
                <TextField
                id="outlined-name"
                label="Contact"
                value={this.state.contact}
                onChange={this.handleChange('contact')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br><br></br>
                {!this.state.taking_location && <Button onClick={this.take_location} variant="contained" color="secondary">Take current location</Button>}
                {this.state.taking_location && <Button variant="outlined" color="secondary">Taking location<CircularProgress className="m_left" size={12} color="secondary" /></Button>}
                <br></br><br></br>
                {!this.state.sending && <Button className="report_send_btn bold" onClick={this.addPlace} variant="contained" color="primary">Send</Button>}
                {this.state.sending && <Button className="report_send_btn bold" variant="outlined" color="primary">Sending<CircularProgress className="m_left" size={12} color="primary" /></Button>}
            </div>
        )
    }
}
