import React,{Component} from 'react'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Home from './Home/main'
import AdminPlace from './AdminPanel/addPlace'
import AdminHealthcare from './AdminPanel/addHealthcare'
import AdminRelief from './AdminPanel/addRelief'
import Healthcare from './HealthcarePanel/main'
import Relief from './ReliefPanel/main'

class Router extends Component{
    render(){
        return(
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className="routes">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/admin/addPlace" exact component={AdminPlace} />
                        <Route path="/admin/addHealthcare" exact component={AdminHealthcare} />
                        <Route path="/admin/addRelief" exact component={AdminRelief} />
                        <Route path="/healthcare" exact component={Healthcare} />
                        <Route path="/relief" exact component={Relief} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router