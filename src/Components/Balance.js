import React from 'react'

class Balance extends React.Component {

    render() {
        // let accountAmount = this.props.account.map(accountObj => accountObj.balance)
        // console.log(accountAmount[0])
        let amount = this.props.transactions.map(transactionObj=> transactionObj.amount)
        let total = amount.reduce((acc, transaction) => (acc += transaction), 0).toFixed(2)
        let savings = this.props.account.map(accountObj => accountObj.saving)
        let finalTotal = parseFloat(total - savings)
        // put an alert when savings are higher than the balance total
        
    return(
        <>
        <h4>Balance</h4>
        <h1>${finalTotal}</h1>
        </>
    )
    }
}
export default Balance