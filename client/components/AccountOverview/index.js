import React from 'react';
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom';
import Services from '../../services/index';
import Header from '../Header';
import ReactLoading from 'react-loading'

import './style.css';
import PayOutPlan from '../PayOutPlan';

export default class AccountOverview extends React.Component{
constructor(props){
    super(props);
    this.state = {
        debitData : [],
        creditData : [],
        payOutData: {},
        flag: false,
        payButton : true,
        load : true,
        loanValue : false
    }
   this.handleScrollToElement = this.handleScrollToElement.bind(this);
   this.accClick = this.accClick.bind(this);
}

handleScrollToElement(event) {
    event.preventDefault()
    const tesNode = ReactDOM.findDOMNode(this.inputElement)
      tesNode.scrollIntoView();
      this.setState({load:false});
      setTimeout(function(){
        this.setState({load:true});
        this.setState({payButton:false});
        tesNode.scrollIntoView();
    }.bind(this),2000);
    var token = sessionStorage.getItem("token");
    Services.payOutCall(token, function(data){
        this.setState({payOutData : data});
       console.log(data, "data");
   }.bind(this),function(err){
       console.log(err);
   })
}

componentWillMount() {
    var token = sessionStorage.getItem("token");
    Services.creditCall(token, function(data){
        this.setState({creditData : data.banks});

   }.bind(this),function(err){
       console.log(err);
   })
    Services.debitCall(token,function(data){
        this.setState({debitData : data.banks});
    }.bind(this),function(err){
        console.log(err);
    })
}

accClick(obj){
    if(this.state.flag){
    document.getElementById(obj).className = 'fas fa-caret-down';
    this.setState({
        flag: false
    })
    }
    else{
    document.getElementById(obj).className = 'fas fa-caret-up';
    this.setState({
        flag: true
    })
    }

}
render(){
    var context = this
    var debitData = this.state.debitData.map(function(data,i){
        return(  <div id="accordion">
        <div className="card">
        <div className="card-header heading" id="headingOne" data-toggle="collapse" data-target={"#"+i+"d"} aria-expanded="true"
        aria-controls={i+"d"} onClick={context.accClick.bind(context,i+"dd")} tabIndex='1'>
        <div className='row'>
            <h5 className="col-4">{data.bankName}</h5>
            <h5 className="col-2">{data.accounts[0].accountType}</h5>
            <h5 className="col-3">{data.accounts[0].interestRate}% <small>AER</small></h5>
            <h5 className="col-2"><span>&#163;</span>{data.accounts[0].availableBalance}</h5>
            <h5 className="col-1"><i id = {i+"dd"} className='fas fa-caret-down'></i></h5>
          </div>
        </div>
        <div id={i+"d"} className="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
            <div className="card-body">
                <div className='row'>
                <h5 className='col-8 float-left' style={{color:'#08c908',fontSize:'24px'}}><b>{data.accounts[0].accountTitle}</b></h5>
                <p style={{color:'#08c908',fontSize:'20px'}}><b>{data.accounts[0].accountNumber}</b></p>
                </div>
                <div className='row'>
                <h6 className='col-8 float-left'>Account Balance</h6>
                <p className='col-4 float-right'><span>&#163;</span>{data.accounts[0].balance}</p>
                </div>
                <div className='row'>
                <h6 className='col-8 float-left'>Standing Instructions</h6>
                <p className='col-4 float-right'><span>&#163;</span>{data.accounts[0].standingInst}</p>
                </div>
                <div className='row'>
                <h6 className='col-8 float-left'>Minimum Balance</h6>
                <p className='col-4 float-right'><span>&#163;</span>{data.accounts[0].minBalance}</p>
                </div>
                <hr/>
                <div className='row'>
                <h6 className='col-8 float-left'>Available Balance</h6>
                <p className='col-4 float-right'><span>&#163;</span>{data.accounts[0].availableBalance}</p>
                </div>
            </div>
        </div>
    </div>
    </div>);
    })
    var creditData = this.state.creditData.map(function(data,i){
        if(data.accounts[0].accountType === "M"){
        var dueDate = data.accounts[0].dueDate;
        dueDate = new Date(dueDate).toDateString();
        return(
            <div id="accordion">
            <div className="card">
            <div className="card-header heading" id="headingOne" data-toggle="collapse" data-target={"#"+i+"c"} aria-expanded="true" aria-controls={i+"c"}
            onClick={context.accClick.bind(context,i+"cc")} tabIndex='1'>
            <div className='row'>
                <h5 className="col-4">{data.bankName}</h5>
                <h5 className="col-2">{data.accounts[0].accountType}</h5>
                <h5 className="col-3">{data.accounts[0].interestRate}% <small>APR</small></h5>
                <h5 className="col-2"><span>&#163;</span>{data.accounts[0].totalBalanceDue}</h5>
                <h5 className="col-1"><i id = {i+ "cc"} className='fas fa-caret-down'></i></h5>
              </div>
            </div>
            <div id={i+"c"} className="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                    <div className='row'>
                    <h5 className='col-8 float-left' style={{color:'#08c908',fontSize:'24px'}}><b>{data.accounts[0].accountTitle}</b></h5>
                    <p style={{color:'#08c908',fontSize:'20px'}}><b>{data.accounts[0].accountNumber}</b></p>
                    </div>
                    <div className='row'>
                    <h6 className='col-8 float-left'>Minimum Monthly Payment</h6>
                    <p className='col-4 float-right'><span>&#163;</span>{data.accounts[0].minMonthlyPayment}</p>
                    </div>
                    <div className='row'>
                    <h6 className='col-8 float-left'>Remaining Full Term</h6>
                    <p className='col-4 float-right'>{data.accounts[0].remainingFullTerm}</p>
                    </div>
                    <div className='row'>
                    <h6 className='col-8 float-left'>Interest Rate</h6>
                    <p className='col-4 float-right'>{data.accounts[0].interestRate} %</p>
                    </div>
                    <div className='row'>
                    <h6 className='col-8 float-left'>Due Date</h6>
                    <p className='col-4 float-right'>{dueDate}</p>
                    </div>


                </div>
            </div>
        </div>
        </div>
        );
    }
        else{
            var dueDate = data.accounts[0].dueDate;
            dueDate = new Date(dueDate).toDateString();
            return(
                <div id="accordion">
                <div className="card">
                <div className="card-header heading" id="headingOne" data-toggle="collapse" data-target={"#"+i+"c"} aria-expanded="true" aria-controls={i+"c"}
                onClick={context.accClick.bind(context,i+"cc")} tabIndex='1'>
                <div className='row'>
                    <h5 className="col-4">{data.bankName}</h5>
                    <h5 className="col-2">{data.accounts[0].accountType}</h5>
                    <h5 className="col-3">{data.accounts[0].apr}% <small>APR</small></h5>
                    <h5 className="col-2"><span>&#163;</span>{data.accounts[0].totalBalanceDue}</h5>
                    <h5 className="col-1"><i id = {i+ "cc"} className='fas fa-caret-down'></i></h5>
                  </div>
                </div>
                <div id={i+"c"} className="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                        <div className='row'>
                        <h5 className='col-8 float-left' style={{color:'#08c908',fontSize:'24px'}}><b>{data.accounts[0].accountTitle}</b></h5>
                        <p style={{color:'#08c908',fontSize:'20px'}}><b>{data.accounts[0].accountNumber}</b></p>
                        </div>
                        <div className='row'>
                        <h6 className='col-8 float-left'>Credit Limit</h6>
                        <p className='col-4 float-right'><span>&#163;</span>{data.accounts[0].creditLimit}</p>
                        </div>
                        <div className='row'>
                        <h6 className='col-8 float-left'>Available Credit</h6>
                        <p className='col-4 float-right'><span>&#163;</span>{data.accounts[0].availableCredit}</p>
                        </div>
                        <div className='row'>
                        <h6 className='col-8 float-left'>Minimum Balance Due</h6>
                        <p className='col-4 float-right'><span>&#163;</span>{data.accounts[0].minBalanceDue}</p>
                        </div>
                        <div className='row'>
                        <h6 className='col-8 float-left'>Due Date</h6>
                        <p className='col-4 float-right'>{dueDate}</p>
                        </div>


                    </div>
                </div>
            </div>
            </div>
            )
        }
    })

    return(
            <div>
            <Header history = {this.props.history} header='ACCOUNT OVERVIEW'/>
            <br/>
            <div className='d-flex flex-column'>
            <div className='p-2'>
                <div className="savings" style={{width: '50%', float:'left'}}>
                  <h5>Debit Balances</h5>
                    {debitData}
                </div>

                <div className="credits" style={{width: '50%', float:'right'}}>
                  <h5>Credit Balances</h5>
                    {creditData}
                </div>
            </div>
            <div className='p-2'>
                <br/>
                {this.state.payButton?
               <center><button className="btn btn-dark"  style={{backgroundColor:'#e0405f'}} onClick={this.handleScrollToElement}>Pay Out Plan</button></center>
         :<PayOutPlan payOutData = {this.state.payOutData} history = {this.props.history}/>}
            </div></div>
            <div ref={input => this.inputElement = input}>
               {this.state.load?null:<center><ReactLoading type='bubbles' color='black' height={'20%'} width={'20%'} /></center>}
            </div>
            </div>
        );
    }
}
