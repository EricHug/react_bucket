import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import App from '../App'
import Home from '../views/Home'
import AntZone from '../views/AntZone'
import Game from '../views/Game'
import Movie from '../views/Movie'
import NotFound from '../views/NotFound'

export default class Routers extends React.Component{
    render(){
        return(
            <Router>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route path="/antzone" component={AntZone}></Route>
                        <Route path="/game" component={Game}></Route>
                        <Route path="/movie" component={Movie}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </App>
            </Router>
        )
    }
}