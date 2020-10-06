import React from 'react'
import Transaction from './Transaction'
import '../App.css'


const TransactionList = (props) => {
    
    let sort = props.transactions.sort((a, b) => b.date -a.date)
    let renderTransactions = (sort.map((transactionObj, index) => <Transaction  key={transactionObj.id} row={index} transactions={transactionObj} deleteTransaction={props.deleteTransaction} />))

    
    return (
        <>
        <h1 style={{color: 'white', padding: '15px'}}>Recent Transactions</h1>
        {renderTransactions.slice(0,4)}
        </>
    )
}

export default TransactionList