
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
        fetch('http://localhost:3000/accounts')
        .then(response => response.json())
        .then(data => {
            let id = data.map(account => account.id)
            this.setState({ account: data, account_id: id })
        })
      }

      submitHandler = (saving, amount, total) => {
        let origSaving = this.state.account.map(accountObj => accountObj.saving)
        let newSaving = (parseFloat(origSaving) + parseFloat(saving))
        if (saving < 2000 && newSaving > 2000) {
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
        fetch(`http://localhost:3000/accounts/${this.state.account_id}`, options)
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
        .then(data => { this.setState({transactions: [...this.state.transactions, data], token: this.props.user.token})})
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

    componentDidUpdate(prev, after) {
        console.log('prev', prev)
        console.log( 'before', this.state.transactions)
        console.log('after', after.transactions)
        if (this.state.transactions !== after.transactions) {
            this.fetchAccount()
          this.props.fetchTransactions()
        }
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
         <div className="badge-container">
            <h4><Badge color="success" >Save $2000 to be Eligible for a Prize!</Badge></h4>
         </div>
         <div className="badge-container">
        <Button style={{padding: '11px'}} color="success" onClick={this.props.clickHandler}>Enter Lottery</Button><br></br> <h6 style={{color: 'white', padding: '5px'}}>Tokens <Badge color="secondary">{this.state.token}</Badge></h6>
        </div>
         <br></br>
         {saving > 2000 ?
         <>
    <Progress animated value={saving} max={[2000]} color="warning" >%{(100*(saving/2000)).toFixed(1)}</Progress>
    </>
    :
    <>
    <Progress animated value={saving} max={[2000]} color="success" >%{(100*(saving/2000)).toFixed(1)}</Progress>
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