import React from 'react'
import { Table, Button } from 'reactstrap'

class Transaction extends React.Component {

    
    
    render() {
        let sign = this.props.transactions.type_trans === 'Expense' ? '-' : '+'
    return(
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Income/Expense</th>
                    <th>Category</th>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">{this.props.row +1}</th>
                    <td>{this.props.transactions.type_trans}</td>
                    <td>{this.props.transactions.category}</td>
                    <td>{this.props.transactions.item}</td>
                    <td>{sign}${Math.abs(this.props.transactions.amount).toFixed(2)}</td>
                    <td>{this.props.transactions.date}</td>
                    <td><Button color="danger" onClick={()=> this.props.deleteTransaction(this.props.transactions)}>Delete</Button></td>
                </tr>
            </tbody>       
        </Table>
    )
    }
}
export default Transaction