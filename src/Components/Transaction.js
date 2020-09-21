import React from 'react'


const Transaction = (props) => {

    let sign = props.transactions.amount < 0 ? '-' : '+'

    return(
        <li>{props.transactions.item} <span>{sign}${props.transactions.amount}</span><button>X</button></li>
    )
}
export default Transaction