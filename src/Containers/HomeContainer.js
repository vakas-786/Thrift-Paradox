
import React from 'react'
import FinanceContainer from './FinanceContainer'
import History from '../Components/History'
import Analysis from '../Components/Analysis'
import {Button} from 'reactstrap'
import {  Switch, Route, withRouter } from 'react-router-dom';


class HomeContainer extends React.Component {

    state = {
        transactions: [],
        account: []
    }

    componentDidMount() {
        this.fetchTransactions()
        this.fetchAccount()
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
            body: JSON.stringify({saving: parseFloat(newSaving)})
        }
        fetch(`http://localhost:3000/accounts/${2}`, options)
        .then(()=> this.fetchAccount())
    }

    fetchTransactions = () => {
        fetch('http://localhost:3000/transactions')
        .then(response => response.json())
        .then(data => this.setState({ transactions: data }))
      }

    
    transactionHandler = (transObj) => {
         console.log(transObj)
        fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ transaction: transObj })
        })
        .then(response => response.json())
        .then(data => this.setState( {transactions: [...this.state.transactions, data]} ))
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
    return (
        // render the finance container here since the finance container will hold the income and expense stuff also make sure to give proper html...
        // elements and classnames so i can make flex box and other design stuff work. Can change the layout later if necessary
        <>
        <Button color="success" onClick={this.props.clickHandler}>Prize!!</Button>
        <FinanceContainer transactions={this.state.transactions} submitHandler={this.transactionHandler} account={this.state.account} deleteTransaction={this.deleteTransaction} savingHandler={this.submitHandler} />
       
        <Switch>
            <Route path="/history" render={() => <History />} />
            <Route path="/analysis" render={() => <Analysis transactions={this.state.transactions} account={this.state.account} />} />
        </Switch>
        
        
        </>
    )
    }
}

export default withRouter(HomeContainer)