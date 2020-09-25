import React from 'react'
import Transaction from './Transaction'

const TransactionList = (props) => {

    let renderTransactions = props.transactions.map((transactionObj) => <Transaction key={transactionObj.id} transactions={transactionObj} deleteTransaction={props.deleteTransaction} />)
    
    return (
        <>
        <h3>Recent Transactions</h3>
        {renderTransactions.slice(0,5)}
        {/* <button>View Full List of Transactions</button> */}
        </>
    )
}

export default TransactionList