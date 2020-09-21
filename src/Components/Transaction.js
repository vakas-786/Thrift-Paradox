import React from 'react'

class Transaction extends React.Component {

    
    clickHandler = (e) => {
        console.log(e)
    }
    render() {
        let sign = this.props.transactions.amount < 0 ? '-' : '+'
    return(
        <li>{this.props.transactions.item} <span>{sign}${Math.abs(this.props.transactions.amount)}</span><button onClick={this.clickHandler}> X</button></li>
    )
    }
}
export default Transaction