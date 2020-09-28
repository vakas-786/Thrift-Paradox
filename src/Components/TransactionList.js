import React from 'react'
import Transaction from './Transaction'

const TransactionList = (props) => {

    let renderTransactions = props.transactions.map((transactionObj, index) => <Transaction  key={transactionObj.id} row={index} transactions={transactionObj} deleteTransaction={props.deleteTransaction} />).slice(0,4)
    
    return (
        <>
        <h3>Recent Transactions</h3>
        {renderTransactions}
        </>
    )
}

export default TransactionList