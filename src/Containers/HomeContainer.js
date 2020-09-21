
import React from 'react'
import FinanceContainer from './FinanceContainer'

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

   render() {
    return (
        // render the finance container here since the finance container will hold the income and expense stuff also make sure to give proper html...
        // elements and classnames so i can make flex box and other design stuff work. Can change the layout later if necessary
        <>
        <h3>Home Container</h3>
        <button>Prize!!</button>
        <FinanceContainer transactions={this.state.transactions} submitHandler={this.transactionHandler} account={this.state.account} />
        </>
    )
    }
}

export default HomeContainer