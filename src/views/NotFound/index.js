import React from 'react'
import {Link} from 'react-router-dom'
import './index.less'

export default class NotFound extends React.Component{
    render(){
        return(<div className="notfound">
           Did you enter the wrong url?<br/>
           <Link to="/">go home</Link>
        </div>)
    }
}