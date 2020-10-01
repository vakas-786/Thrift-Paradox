import React from 'react'
import '../App.css'

import { Form, Input  } from 'reactstrap'


class AddSavings extends React.Component {

    state= {
        savings: 0
    }

    // have an option to withdraw savings by putting negative input to form
    
    submitHandler = (e) => {
        let amount = this.props.transactions.map(transactionObj=> transactionObj.amount)
        let total = amount.reduce((acc, transaction) => (acc += transaction), 0).toFixed(2)
        e.preventDefault()
        this.props.submitHandler(this.state.savings, amount, total)
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        // const savings = props.account.map(accountObj=> accountObj.saving)   
        
        return(
            <div className="add-savings-container">
            <h2 style={{color: "white"}} className="savings-header"></h2>
            <Form className='transaction-form' onSubmit ={this.submitHandler} style={{width: 300, backgroundColor: '#525f7f', color: "white", border: '.0625rem solid rgba(34,42,66,.05)'}}>
            <Input
            style={{backgroundColor: '#525f7f', color: 'white', border: '.0625rem solid rgba(34,42,66,.05)'}}
            onChange ={this.changeHandler}
              type="number"
              name="savings"
              value={this.state.value}
              placeholder="Amount"
              step="00.01"
            />
            {/* <label htmlFor="savings">Deposit</label> */}
            <Input style={{backgroundColor: '#525f7f', color: "white"}} type="submit"/>

            </Form>
            </div>
        )
    }
}

export default AddSavings