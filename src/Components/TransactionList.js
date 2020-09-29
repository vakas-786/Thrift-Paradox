import { render } from '@testing-library/react'
import React from 'react'
import Transaction from './Transaction'

const TransactionList = (props) => {
    
    //set a timer
    let sort = props.transactions.sort((a, b) => b.date -a.date)
    let renderTransactions = (props.transactions.map((transactionObj, index) => <Transaction  key={transactionObj.id} row={index} transactions={transactionObj} deleteTransaction={props.deleteTransaction} />))
    
    return (
        <>
        <h3>Recent Transactions</h3>
        {renderTransactions}
        </>
    )
}

export default TransactionList