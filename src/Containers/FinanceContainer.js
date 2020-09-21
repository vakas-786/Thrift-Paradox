import React from 'react'
import TransactionForm from '../Components/TransactionForm'
import Balance from '../Components/Balance'
import TransactionList from '../Components/TransactionList'
import Calculate from '../Components/Calculate'

class FinanceContainer extends React.Component {

    

    render() {
    return (
        // do i want to render the first 3 transactions here and make a seperate route with a componenet showing the full list?
        <>
        <Balance transactions={this.props.transactions} account={this.props.account} />
        <Calculate transactions={this.props.transactions}/>
        <TransactionList transactions={this.props.transactions}/>
        <TransactionForm transactions={this.props.transactions} submitHandler={this.props.submitHandler}/>
        
        </>
    )
    }
}

export default FinanceContainer