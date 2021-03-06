import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import '../App.css'
class Balance extends React.Component {

    render() {
        let expense = this.props.transactions.filter(transactionObj => transactionObj.type_trans === 'Expense')
        let expenseMap = expense.map(expenseObj => expenseObj.amount)
        let totalExpense = expenseMap.reduce((acc, expense) => (acc += expense), 0)
        let amount = this.props.transactions.map(transactionObj=> transactionObj.amount)
        let total = amount.reduce((acc, transaction) => (acc += transaction), 0).toFixed(2)
        let balance = total - totalExpense
        let savings = this.props.account.saving
        let finalTotal = parseFloat(balance - savings)
        
    return(
        <>
        <ListGroup >
            <ListGroupItem id='balance-element' className='balance-element' >
        <h1 className="balance-heading">Balance</h1>
        <h1 className="balance-heading">${finalTotal}</h1>
        </ListGroupItem>
        </ListGroup>
        </>
    )
    }
}
export default Balance

