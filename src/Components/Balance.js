import React from 'react'

class Balance extends React.Component {

    changHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        let accountAmount = this.props.account.map(accountObj => accountObj.balance)
        console.log(accountAmount[0])
        let amount = this.props.transactions.map(transactionObj=> transactionObj.amount)
        let total = amount.reduce((acc, transaction) => (acc += transaction), 0).toFixed(2)
    return(
        <>
        <h4>Balance</h4>
        <h1>${total}</h1>
        </>
    )
    }
}
export default Balance