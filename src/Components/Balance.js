import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import '../App.css'
class Balance extends React.Component {

    render() {
        // let accountAmount = this.props.account.map(accountObj => accountObj.balance)
        // console.log(accountAmount[0])
        let expense = this.props.transactions.filter(transactionObj => transactionObj.type_trans === 'Expense')
        let expenseMap = expense.map(expenseObj => expenseObj.amount)
        let totalExpense = expenseMap.reduce((acc, expense) => (acc += expense), 0)
        let amount = this.props.transactions.map(transactionObj=> transactionObj.amount)
        let total = amount.reduce((acc, transaction) => (acc += transaction), 0).toFixed(2)
        let balance = total - totalExpense
        let savings = this.props.account.map(accountObj => accountObj.saving)
        let finalTotal = parseFloat(balance - savings)
        // put an alert when savings are higher than the balance total
        
    return(
        <>
        <ListGroup >
            <ListGroupItem color='info'>
        <div>
        <h1 className="savings-header">Balance</h1>
        <h1 className="savings-header">${finalTotal}</h1>
        </div>
        </ListGroupItem>
        </ListGroup>
        </>
    )
    }
}
export default Balance

