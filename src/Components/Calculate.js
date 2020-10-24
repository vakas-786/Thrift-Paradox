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

    let savings = props.account.saving

    return (
        <>
        <div className="calculate-box">
        <div className="calculate-container">
            <ListGroup horizontal>
                <ListGroupItem id='income-element' className='income-element' color="success">
        <div className="income-card">
        <h2 className="income-header">Income</h2>
        <h5 className="income-header">${totalIncome}</h5>
        </div>
        </ListGroupItem>
        <ListGroupItem id='expense-element' className='expense-element'>
        <div className="income-card"> 
        <h2 className="expense-header">Expense</h2>
        <h5 className="expense-header">-${Math.abs(totalExpense)}</h5>
        </div>
        </ListGroupItem>
        </ListGroup>
        </div>
        </div>
        <div className="balance-box">
        </div>
            <ListGroup  >
        <ListGroupItem id='savings-element' className='savings-element' style={{background: 'gold'}}>
        <h2 className="savings-header">Savings</h2>
        <h5 className="savings-header">${(Math.round(savings * 100) / 100).toFixed(2)}</h5>
        </ListGroupItem>
        </ListGroup>
        </>

    )
}

export default Calculate 