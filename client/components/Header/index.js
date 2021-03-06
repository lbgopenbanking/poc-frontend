import React from 'react';
import './style.css';
import { HashRouter as Router } from 'react-router-dom'


export default class Header extends React.Component{
  constructor(props){
    super(props);
    if(!sessionStorage.getItem('token'))
      this.props.history.push('/')
    this.logoutClick = this.logoutClick.bind(this)
  }
  logoutClick(){
    sessionStorage.clear();
    this.props.history.push("/")
  }
    render(){
        return(
            <div className="container-fluid header">
            <div className="card">
                <div className="card-header heading">
                    <h5 className="float-left" style={{marginTop:'10px'}}>{this.props.header}</h5>
                    <button className="btn float-right" onClick = {this.logoutClick} style={{paddingTop:'12px'}}><h6>Logout</h6></button>
                </div>
            </div>
            </div>
        );
    }
}
