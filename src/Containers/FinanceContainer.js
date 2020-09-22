import React from 'react'
import TransactionForm from '../Components/TransactionForm'
import Balance from '../Components/Balance'
import TransactionList from '../Components/TransactionList'
import Calculate from '../Components/Calculate'
import AddSavings from '../Components/AddSavings'

class FinanceContainer extends React.Component {

    state = {
        savings: 0,
        balance: 0
    }

    fetchAccount = () => {
        fetch('http://localhost:3000/accounts')
        .then(response => response.json())
        .then(data => this.setState({account: data}))
    }

    componentDidMount() {
        this.fetchAccount()
    }

    submitHandler = (saving, amount, total) => {
        let origSaving = this.props.account.map(accountObj => accountObj.saving)
        console.log(origSaving)
        let newSaving = parseInt(origSaving) + parseInt(saving)
        // this.setState({account: [...this.state.account]})
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({saving: parseFloat(newSaving)})
        }
        fetch(`http://localhost:3000/accounts/${1}`, options)
        .then(this.fetchAccount())
    }

    render() {
        console.log(this.props.account)
    return (
        // do i want to render the first 3 transactions here and make a seperate route with a componenet showing the full list?
        <>
        <Balance transactions={this.props.transactions} account={this.props.account} />
        <Calculate transactions={this.props.transactions} account={this.props.account} savings={this.state.savings}/>
        <TransactionList transactions={this.props.transactions} deleteTransaction={this.props.deleteTransaction}/>
        <TransactionForm transactions={this.props.transactions} submitHandler={this.props.submitHandler}/>
        <AddSavings submitHandler={this.props.savingHandler} transactions={this.props.transactions} account={this.props.account}/>
        
        </>
    )
    }
}

export default FinanceContainer