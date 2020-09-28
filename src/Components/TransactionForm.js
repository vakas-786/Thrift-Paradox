import React from 'react'
import { Form, FormGroup, Label, Input  } from 'reactstrap'

class TransactionForm extends React.Component {

    state = {

            item: '',
            type_trans: '',
            category: '',
            amount: 0,
            date: '',
            account_id: 2
    }

     changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }

    render() {
      
    return (
        <div >
            <h3>Enter a New Transaction</h3>
        <Form onSubmit={this.submitHandler}  inline >
            <div>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" name="item"  value={this.state.item} placeholder="Enter an Item" onChange={this.changeHandler} />
              <label htmlFor="item">Item</label>
              </FormGroup>
            </div>
            <div>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="select" defaultValue='select' name="type_trans"  placeholder="Income/Expense" onChange={this.changeHandler}>
                <option  value='select' disabled>Transaction Type</option>
                <option name="type_trans" value='Income'>Income</option>
                <option name="type_trans" value ='Expense'>Expense</option>
              </Input>
              </FormGroup>
            </div>

            {/* <div>
              <input type="text" name="category"  value={this.state.category} placeholder="Category" onChange={this.changeHandler}/>
              <label htmlFor="category">Category</label>
            </div> */}
            <div >
              <FormGroup>
              <Input type="select" defaultValue='select' name='category'  placeholder='Select a Category' onChange={this.changeHandler}>
                <option name='category' value='select' disabled >Category</option>
                <option name='category' value='Bills/Utilities'>Bills/Utilities</option>
                <option name='category' value='Salary'>Salary</option>
                <option name='category' value='Transfer'>Transfer</option>
                <option name='category' value="Groceries">Groceries</option>
                <option name='category' value='Shopping'>Shopping</option>
                <option name='category' value='Recreation'>Recreation</option>
                <option name='category' value='Misc'>Misc</option>
              </Input>
              </FormGroup>
            </div>

            <div>
              <FormGroup>
              <Input type="number" step="00.01" name="amount" placeholder="Enter an Amount" value={this.state.amount} onChange={this.changeHandler}/>
              <Label htmlFor="amount">Amount</Label>
              </FormGroup>
            </div>

            <div>
              <Input type="date" name="date" placeholder="Choose a Date" value={this.state.date} onChange={this.changeHandler}/>
              <label htmlFor="date">Date</label>
            </div>
                
            <Input type="submit"/>
            
          </Form>
          </div>

    )
    }
}
export default TransactionForm