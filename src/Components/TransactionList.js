import React from 'react'
import Transaction from './Transaction'

const TransactionList = (props) => {

    let renderTransactions = props.transactions.map((transactionObj) => <Transaction key={transactionObj.id} transactions={transactionObj} deleteTransaction={props.deleteTransaction} />)

    return (
        <>
        <h3>Transaction History</h3>
        {renderTransactions}
        </>
    )
}

export default TransactionList