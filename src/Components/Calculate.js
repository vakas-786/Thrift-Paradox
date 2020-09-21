import React from 'react'

const Calculate = (props) => {
    const amount = props.transactions.map(transactionObj=> transactionObj.amount)    
    const incomeFilter = amount.filter(trans => trans > 0)
    const totalIncome = incomeFilter.reduce((acc, transaction) => (acc += transaction), 0).toFixed(2)

    const totalExpense = (amount.filter(trans => trans < 0).reduce((acc, transaction) => (acc += transaction), 0) * -1).toFixed(2)

    return (
        <>
        <div>
        <h2>Income</h2>
        <h5>{totalIncome}</h5>
        </div>
        <div>
        <h2>Expense</h2>
        <h5>{totalExpense}</h5>
        </div>
        <h2>Savings</h2>
        <h5>Calculate here</h5>
        </>

    )
}

export default Calculate 