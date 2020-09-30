
import React from 'react'
import FinanceContainer from './FinanceContainer'
import History from '../Components/History'
import Analysis from '../Components/Analysis'
import {Button, Progress} from 'reactstrap'
import { Badge } from 'reactstrap';
import '../App.css'
import {  Switch, Route, withRouter, Link } from 'react-router-dom';


class HomeContainer extends React.Component {

    state = {
        transactions: [],
        account: []
    }

    

    fetchAccount = () => {
        fetch('http://localhost:3000/accounts')
        .then(response => response.json())
        .then(data => this.setState({ account: data }))
      }

      submitHandler = (saving, amount, total) => {
        let origSaving = this.state.account.map(accountObj => accountObj.saving)
        let newSaving = (parseFloat(origSaving) + parseFloat(saving))
        origSaving = newSaving
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({saving: newSaving})
        }
        fetch(`http://localhost:3000/accounts/${2}`, options)
        .then(()=> this.fetchAccount())
    }

    fetchTransactions = () => {
        fetch('http://localhost:3000/transactions')
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
        fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ transaction: transObj })
        })
        .then(response => response.json())
        .then(data => { this.setState({transactions: [...this.state.transactions, data]})})
        .then(this.fetchTransactions())
    }

    

    deleteTransaction = (trans_obj) => {
        console.log(trans_obj)
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
        fetch(`http://localhost:3000/transactions/${trans_obj.id}`, options)
    }

    

   render() {
       let saving = this.state.account.map(accountObj => accountObj.saving)

    return (
        // render the finance container here since the finance container will hold the income and expense stuff also make sure to give proper html...
        // elements and classnames so i can make flex box and other design stuff work. Can change the layout later if necessary
        <>
        <br>
        </br>
        <div className="progress-container">
         {/* <div className="progress-heading">Save $2000 to be Eligible for a Prize!</div> */}
         <div className="badge-container">
            <Badge color="success" >Save $2000 to be Eligible for a Prize!</Badge>
         </div>
         <br></br>
         <div className="badge-container">
        <Button color="success" onClick={this.props.clickHandler}>Enter Lottery</Button>
        </div>
         <br></br>
        <Progress animated value={saving} max={[2000]} color="warning"/>
        </div>
        
        <br></br>
        <FinanceContainer fetchTransactions ={this.fetchTransactions} transactions={this.state.transactions} submitHandler={this.transactionHandler} account={this.state.account} deleteTransaction={this.deleteTransaction} savingHandler={this.submitHandler} />
        </>
    )
    }
}

export default withRouter(HomeContainer)