import React from 'react'

const Calculate = (props) => {
    const amount = props.transactions.map(transactionObj=> transactionObj.amount) 
    const expense = props.transactions.filter(transactionObj=> transactionObj.type_trans === 'Expense')    
    const expenseAmount = expense.map(transactionObj => transactionObj.amount)
   
    const incomeFilter = amount.filter(trans => trans > 0)
    const totalIncome = incomeFilter.reduce((acc, transaction) => (acc += transaction), 0).toFixed(2)

    const totalExpense = (expenseAmount.filter(trans => trans > 0).reduce((acc, transaction) => (acc += transaction), 0) * -1).toFixed(2)

    let savings = props.account.map(accountObj => accountObj.saving)

    return (
        <>
        <div className="calculate-container">
        <div >
        <h2>Income</h2>
        <h5>{totalIncome}</h5>
        </div>
        <div >
        <h2>Expense</h2>
        <h5>{totalExpense}</h5>
        </div>
        </div>
        <div className="savings-container">
        <h2>Savings</h2>
        <h5 className="savings-amount">${(Math.round(savings * 100) / 100).toFixed(2)}</h5>
        </div>
        </>

    )
}

export default Calculate 