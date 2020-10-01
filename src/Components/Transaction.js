import React from 'react'
import { Table, Button } from 'reactstrap'
import { withRouter} from 'react-router-dom'
import '../App.css'


class Transaction extends React.Component {

    routeHelper=()=> {
        let transaction = this.props.transactions
        console.log('route', transaction.id)
        let path = `/transactions/${transaction.id}/edit`;
        this.props.history.push(path)
      }

    render() {
        let sign = this.props.transactions.type_trans === 'Expense' ? '-' : '+'
    return(
        <Table className='transaction-table' style={{backgroundColor: '#525f7f', color: "white"}}>
            <thead >
                <tr >
                    <th>#</th>
                    <th>Income/Expense</th>
                    <th>Category</th>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody >
                <tr >
                    <th scope="row">{this.props.row +1}</th>
                    <td>{this.props.transactions.type_trans}</td>
                    <td>{this.props.transactions.category}</td>
                    <td>{this.props.transactions.item}</td>
                    <td>{sign}${Math.abs(this.props.transactions.amount).toFixed(2)}</td>
                    <td>{this.props.transactions.date}</td>
                    <td><Button style={{background: '#c21525' }} onClick={()=> this.props.deleteTransaction(this.props.transactions)}>Delete</Button><Button style={{background: '#0000FF'}} onClick={this.routeHelper}>Update</Button></td>
                </tr>
            </tbody>       
        </Table>
    )
    }
}
export default withRouter(Transaction)