
import React from 'react'
import FinanceContainer from './FinanceContainer'
import {Button, Progress} from 'reactstrap'
import { Badge } from 'reactstrap';
import '../App.css'
import {  withRouter} from 'react-router-dom';


class HomeContainer extends React.Component {

    state = {
        transactions: [],
        account: [],
        account_id: 0,
        token: this.props.user.token
    }

    fetchAccount = () => {
        let token = localStorage.getItem("token")
        fetch('https://thrift-paradox-api.herokuapp.com/accounts', {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          })
        .then(response => response.json())
        .then(data => {
            let id = data.id
            this.setState({ account: data, account_id: id })
        })
      }

      submitHandler = (saving) => {
        let origSaving = this.state.account.saving
        let newSaving = (parseFloat(origSaving) + parseFloat(saving))
        if (origSaving < 2000 && newSaving >= 2000) {
        this.setState({token: this.state.token +1})
        }
        origSaving = newSaving
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({saving: newSaving})
        }
        fetch(`https://thrift-paradox-api.herokuapp.com/accounts/${this.state.account_id}`, options)
        .then(()=> this.fetchAccount())
    }

    fetchTransactions = () => {
        let token = localStorage.getItem("token")
        fetch('https://thrift-paradox-api.herokuapp.com/transactions', {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          })
        .then(response => response.json())
        .then(data => {
             this.setState({ transactions: data })
        })
      }

      componentDidMount() {
        this.fetchTransactions()
        this.fetchAccount()
     }

    
     transactionHandler = (transObj) => {
        fetch('https://thrift-paradox-api.herokuapp.com/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ transaction: transObj })
        })
        .then(response => response.json())
        .then(data => { this.setState({transactions: [...this.state.transactions, data], token: this.props.user.token})})
        .then(this.fetchTransactions())
    }

    

    deleteTransaction = (trans_obj) => {
        let newArr = this.state.transactions.filter(transactions => transactions.id !== trans_obj.id)
        this.setState({transactions: newArr})
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(trans_obj)
        }
        fetch(`https://thrift-paradox-api.herokuapp.com/transactions/${trans_obj.id}`, options)
    }

    componentDidUpdate(prev, after) {
        if (this.state.transactions !== after.transactions) {
            this.fetchAccount()
          this.props.fetchTransactions()
        }
      }
    

   render() {
       let saving = this.state.account.saving
    return (
        <>
        <br>
        </br>
        <div className="progress-container">
         <div className="badge-container">
            <h4><Badge color="success" >Save $2000 to be Eligible for a Prize!</Badge></h4>
         </div>
         <div className='badge-container'>
         <h5 style={{color: 'white', padding: '5px'}}>Tokens: <Badge color="warning">{this.state.token}</Badge></h5>
         </div>
         <div className="badge-container">
        <Button style={{padding: '11px'}} color="success" onClick={this.props.clickHandler}>Enter Lottery</Button><br></br> 
        </div>
         <br></br>
         {saving > 2000 ?
         <>
    <Progress animated value={parseFloat(saving)} max={2000} color="warning" >{saving<2000 ? (100*(saving/2000)).toFixed(0) : 100}%</Progress>
    </>
    :
    <>
    <Progress animated value={parseFloat(saving)} max={2000} color="success" >{saving<2000 ? (100*(saving/2000)).toFixed(0) : 100}%</Progress>
    </>
    }
</div>
    
        <br></br>
        <FinanceContainer id={this.props.account_id} fetchTransactions ={this.fetchTransactions} transactions={this.state.transactions} submitHandler={this.transactionHandler} account={this.state.account} deleteTransaction={this.deleteTransaction} savingHandler={this.submitHandler} />
        </>
    )
    }
}

export default withRouter(HomeContainer)