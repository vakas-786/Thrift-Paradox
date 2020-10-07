import React from 'react'
import '../App.css'

import { Form, Input, FormText  } from 'reactstrap'


class AddSavings extends React.Component {

    state= {
        savings: 0
    }
    
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
        return(
            <div className="add-savings-container">
            <FormText className='text-center' color="white">
          Enter a Negative Amount to Withdraw From Savings
          </FormText>
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
            <Input style={{backgroundColor: '#525f7f', color: "white"}} type="submit"/>

            </Form>
            </div>
        )
    }
}

export default AddSavings