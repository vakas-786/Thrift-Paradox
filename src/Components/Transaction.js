import React from 'react'

class Transaction extends React.Component {

    
    
    render() {
        let sign = this.props.transactions.amount < 0 ? '-' : '+'
    return(
        <li>{this.props.transactions.item} <span>{sign}${Math.abs(this.props.transactions.amount)}</span><button onClick={(transaction)=> this.props.deleteTransaction(this.props.transactions)}> X</button></li>
    )
    }
}
export default Transaction