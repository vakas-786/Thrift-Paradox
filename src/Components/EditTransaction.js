import React from 'react'
import { withRouter} from 'react-router-dom'
import '../App.css'
import { Form, FormGroup, Input  } from 'reactstrap'



class EditTransaction extends React.Component {

    state= {
        id: this.props.transaction.id,
        item: this.props.transaction.item,
        type_trans: this.props.transaction.type_trans,
        category: this.props.transaction.category,
        amount: this.props.transaction.amount,
        date: this.props.transaction.date,
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
        return(
            <div className='edit-form'>
            <h1 className="text-center" style={{color: 'white', margin: 'auto', padding: '10px'}}>Update Item Description and Category</h1>
            <Form style={{backgroundColor: '#525f7f', color: "white",   width: '76%', padding: '5px', margin: 'auto' }}  onSubmit={this.submitHandler}   >
            <div>
              <FormGroup style={{backgroundColor: '#525f7f', border: '.0625rem solid rgba(34,42,66,.05)'}}>
              <Input style={{backgroundColor: '#525f7f', color: "white"}} type="text" name="item" value={this.state.item} placeholder="Enter an Item" onChange={this.changeHandler} />
              </FormGroup>
              <FormGroup style={{backgroundColor: '#525f7f', border: '.0625rem solid rgba(34,42,66,.05)'}}>
              <Input style={{backgroundColor: '#525f7f', color: "white"}}  value={this.state.category} type="select" defaultValue='select' name='category'  placeholder='Select a Category' onChange={this.changeHandler}>
                <option name='category' value='select' disabled >Category</option>
                <option name='category' value='Bills/Utilities'>Bills/Utilities</option>
                <option name='category' value='Salary'>Salary</option>
                <option name='category' value='Transfer'>Transfer</option>
                <option name='category' value="Groceries">Groceries</option>
                <option name='category' value='Shopping'>Shopping</option>
                <option name='category' value='Recreation'>Recreation</option>
                <option name='category' value='Misc'>Misc</option>
              </Input>
              <Input style={{backgroundColor: '#525f7f', color: "white"}} type="submit"/>
              </FormGroup>
            </div>

            </Form>
            </div>
            

        )
    }
}

export default withRouter(EditTransaction)