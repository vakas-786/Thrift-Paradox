import React from 'react'
import Transaction from './Transaction'

class History extends React.Component {

    state = {
        transactions: [],
        category: ''
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchTransactions = () => {
        fetch('http://localhost:3000/transactions')
        .then(response => response.json())
        .then(data => this.setState({ transactions: data }))
      }

      deleteTransaction = (trans_obj) => {
        console.log(trans_obj)
        let newArr = this.state.transactions.filter(transactions => transactions.id !== trans_obj.id)
        this.setState({transactions: newArr})
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(trans_obj)
        }
        fetch(`http://localhost:3000/transactions/${trans_obj.id}`, options)
    }

      componentDidMount() {
          this.fetchTransactions()
      }
    render() {

        let filter = this.state.transactions.filter(trans_obj => trans_obj.category === this.state.category )

        let filterTransactions = filter.map((transactionObj) => <Transaction key={transactionObj.id} transactions={transactionObj} deleteTransaction={this.deleteTransaction} />)
        let renderTransactions = this.state.transactions.map((transactionObj) => <Transaction key={transactionObj.id} transactions={transactionObj} deleteTransaction={this.deleteTransaction} />)
        
        return(
            <>
            <h1>History</h1>
            <select defaultValue='' name='category'  placeholder='Select a Category' onChange={this.changeHandler}>
                <option name='category' value=''>All</option>
                <option name='category' value='Bills/Utilities'>Bills/Utilities</option>
                <option name='category' value='Salary'>Salary</option>
                <option name='category' value='Transfer'>Transfer</option>
                <option name='category' value="Groceries">Groceries</option>
                <option name='category' value='Shopping'>Shopping</option>
                <option name='category' value='Recreation'>Recreation</option>
                <option name='category' value='Misc'>Misc</option>
              </select>
            {this.state.category === '' ? renderTransactions : filterTransactions}
            </>
        )
    }
}

export default History 