import React from 'react'

class Transaction extends React.Component {

    
    
    render() {
        console.log(this.props.transactions)
        let sign = this.props.transactions.type_trans === 'Expense' ? '-' : '+'
    return(
        <>
        <li>{this.props.transactions.item} <span>{sign}${Math.abs(this.props.transactions.amount).toFixed(2)}</span><button onClick={()=> this.props.deleteTransaction(this.props.transactions)}> X</button></li>
        <span>{this.props.transactions.category}: {this.props.transactions.date}</span>
        </>
    )
    }
}
export default Transaction