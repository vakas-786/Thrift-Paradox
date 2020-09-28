import React from 'react'
import TransactionForm from '../Components/TransactionForm'
import Balance from '../Components/Balance'
import TransactionList from '../Components/TransactionList'
import Calculate from '../Components/Calculate'
import AddSavings from '../Components/AddSavings'

class FinanceContainer extends React.Component {


    render() {
    return (
        // do i want to render the first 3 transactions here and make a seperate route with a componenet showing the full list?
        <div>
        <Balance transactions={this.props.transactions} account={this.props.account} />
        <Calculate transactions={this.props.transactions} account={this.props.account} />
        <TransactionForm transactions={this.props.transactions} submitHandler={this.props.submitHandler}/>
        <AddSavings submitHandler={this.props.savingHandler} transactions={this.props.transactions} account={this.props.account}/>
        <TransactionList transactions={this.props.transactions} deleteTransaction={this.props.deleteTransaction}/>
        </div>
    )
    }
}

export default FinanceContainer