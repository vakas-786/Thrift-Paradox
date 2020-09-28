import React from 'react'
import { Form, FormGroup, Label, Input, FormText  } from 'reactstrap'


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
            <h2>Add to Savings</h2>
            <Form onSubmit ={this.submitHandler} style={{width: 300}}>
            <Input
            onChange ={this.changeHandler}
              type="number"
              name="savings"
              value={this.state.value}
              placeholder="Amount"
              step="00.01"
            />
            {/* <label htmlFor="savings">Deposit</label> */}
            <Input type="submit"/>

            </Form>
            </div>
        )
    }
}

export default AddSavings