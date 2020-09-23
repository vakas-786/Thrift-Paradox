import React from 'react'

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
        <>
        
        <form onSubmit={this.submitHandler} >
            <h3>Enter a New Transaction</h3>
            <div>
              <input type="text" name="item"  value={this.state.item} placeholder="Enter an Item" onChange={this.changeHandler} />
              <label htmlFor="item">Item</label>
            </div>
            <div>
              <input type="text" name="type_trans"  value={this.state.trans_type} placeholder="Income/Expense" onChange={this.changeHandler}/>
              <label htmlFor="type_trans">Income/Expense</label>
            </div>

            <div>
              <input type="text" name="category"  value={this.state.category} placeholder="Category" onChange={this.changeHandler}/>
              <label htmlFor="category">Category</label>
            </div>

            <div>
              <input type="number" step="00.01" name="amount" placeholder="Enter an Amount" value={this.state.amount} onChange={this.changeHandler}/>
              <label htmlFor="amount">Amount</label>
            </div>

            <div>
              <input type="date" name="date" placeholder="Choose a Date" value={this.state.date} onChange={this.changeHandler}/>
              <label htmlFor="date">Date</label>
            </div>
                
            <input type="submit" />
            
          </form>
          </>

    )
    }
}
export default TransactionForm