import React from 'react'
import Transaction from './Transaction'
import '../App.css'
import { Input  } from 'reactstrap'


class History extends React.Component {

    state = {
        transactions: [],
        category: ''
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchTransactions = () => {
        let token = localStorage.getItem("token")
        fetch('https://thrift-paradox-api.herokuapp.com/transactions', {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          })
        .then(response => response.json())
        .then(data => this.setState({ transactions: data }))
      }

      deleteTransaction = (trans_obj) => {
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
        fetch(`https://thrift-paradox-api.herokuapp.com/transactions/${trans_obj.id}`, options)
    }

      componentDidMount() {
          this.fetchTransactions()
      }
    render() {

        let sorted = this.state.transactions.sort((a, b) => b.date -a.date)
        let filter = sorted.filter(trans_obj => trans_obj.category === this.state.category )

        let filterTransactions = filter.map((transactionObj, index) => <Transaction row={index} key={transactionObj.id} transactions={transactionObj} deleteTransaction={this.deleteTransaction} />)
        let renderTransactions = sorted.map((transactionObj,index) => <Transaction row={index}  key={transactionObj.id} transactions={transactionObj} deleteTransaction={this.deleteTransaction} />)
        
        return(
            <>
            <h1 style={{color: "white", padding: '10px'}}>History</h1>
            <Input style={{backgroundColor: '#525f7f', color: "white", padding: '10px', width: '12%' }} type="select" defaultValue='' name='category'  placeholder='Select a Category' onChange={this.changeHandler}>
                <option name='category' value=''  >All</option>
                <option name='category' value='Bills/Utilities'>Bills/Utilities</option>
                <option name='category' value='Salary'>Salary</option>
                <option name='category' value='Transfer'>Transfer</option>
                <option name='category' value="Groceries">Groceries</option>
                <option name='category' value='Shopping'>Shopping</option>
                <option name='category' value='Recreation'>Recreation</option>
                <option name='category' value='Misc'>Misc</option>
              </Input>
              <br>
              </br>
            {this.state.category === '' ? renderTransactions.sort((a, b) => b.date -a.date) : filterTransactions.sort((a, b) => b.date -a.date)}
            </>
        )
    }
}

export default History 