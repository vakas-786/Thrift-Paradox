import React from 'react'
import '../App.css'
import { ListGroup, ListGroupItem } from 'reactstrap'

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
        <div className="calculate-box">
        <div className="calculate-container">
            <ListGroup horizontal>
                <ListGroupItem color="success">
        <div className="income-card">
        <h2 className="savings-header">Income</h2>
        <h5 className="savings-header">${totalIncome}</h5>
        </div>
        </ListGroupItem>
        <ListGroupItem color ="danger">
        <div className="income-card">
        <h2 className="savings-header">Expense</h2>
        <h5 className="savings-header">-${Math.abs(totalExpense)}</h5>
        </div>
        </ListGroupItem>
        </ListGroup>
        </div>
        </div>
        <div className="balance-box">
        </div>
            <ListGroup  >
        <ListGroupItem color="warning">
        <h2 className="savings-header">Savings</h2>
        <h5 className="savings-header">${(Math.round(savings * 100) / 100).toFixed(2)}</h5>
        </ListGroupItem>
        </ListGroup>
        </>

    )
}

export default Calculate 