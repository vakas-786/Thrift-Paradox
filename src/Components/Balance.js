import React from 'react'

const Balance = (props) => {

    let amount = props.transactions.map(transactionObj=> transactionObj.amount)
    let total = amount.reduce((acc, transaction) => (acc += transaction), 0).toFixed(2)
    return(
        <>
        <h4>Balance</h4>
        <h1>${total}</h1>
        </>
    )
}
export default Balance