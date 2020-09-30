import React from 'react'
import Transaction from './Transaction'
import '../App.css'


const TransactionList = (props) => {
    
    //set a timer
    let sort = props.transactions.sort((a, b) => b.date -a.date)
    let renderTransactions = (sort.map((transactionObj, index) => <Transaction  key={transactionObj.id} row={index} transactions={transactionObj} deleteTransaction={props.deleteTransaction} />))
    
    return (
        <>
        <h3 className="text-center" style={{color: 'white', padding: '10px'}}>Recent Transactions</h3>
        {renderTransactions.slice(0,4)}
        </>
    )
}

export default TransactionList