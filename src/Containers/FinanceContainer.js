import React from 'react'
import TransactionForm from '../Components/TransactionForm'
import Balance from '../Components/Balance'
import TransactionList from '../Components/TransactionList'
import Calculate from '../Components/Calculate'
import AddSavings from '../Components/AddSavings'

class FinanceContainer extends React.Component {

    componentDidUpdate(prev) {
        if (prev.transactions.length !== this.props.transactions.length) {
            this.props.fetchTransactions()
        }
    }


    render() {
        
    return (
        // do i want to render the first 3 transactions here and make a seperate route with a componenet showing the full list?
        <>
        <div className="balance-box">
        <Balance transactions={this.props.transactions} account={this.props.account} />
        </div>
        <div className="calculate-box">
        <Calculate transactions={this.props.transactions} account={this.props.account} />
        </div>
        <AddSavings submitHandler={this.props.savingHandler} transactions={this.props.transactions} account={this.props.account}/>
        <TransactionForm fetchTransactions={this.props.fetchTransactions} transactions={this.props.transactions} submitHandler={this.props.submitHandler}/>
        <TransactionList  transactions={this.props.transactions} deleteTransaction={this.props.deleteTransaction}/>
        </>
    )
    }
}

export default FinanceContainer