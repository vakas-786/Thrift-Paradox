import React from 'react'
import TransactionForm from '../Components/TransactionForm'
import Balance from '../Components/Balance'
import TransactionList from '../Components/TransactionList'
import Calculate from '../Components/Calculate'
import AddSavings from '../Components/AddSavings'
import { UncontrolledCollapse, Button} from 'reactstrap';
import '../App.css'


class FinanceContainer extends React.Component {

    componentDidUpdate(prev) {
        if (prev.transactions.length !== this.props.transactions.length) {
            this.props.fetchTransactions()
        }
    }


    render() {
        
    return (
        <>
        <div className="balance-box">
        <Balance transactions={this.props.transactions} account={this.props.account} />
        </div>
        <Calculate transactions={this.props.transactions} account={this.props.account} />
        <br></br>
        <div className="text-center">
        <Button  color="primary" id="toggler" style={{ marginBottom: '1rem', color: "white", padding: '10px' }}>
      Add/Withdraw Savings
    </Button>
    </div>
    <UncontrolledCollapse toggler="#toggler">
        <AddSavings submitHandler={this.props.savingHandler} transactions={this.props.transactions} account={this.props.account}/>
    </UncontrolledCollapse>
    <br></br>
        <TransactionForm id ={this.props.id} account={this.props.account} fetchTransactions={this.props.fetchTransactions} transactions={this.props.transactions} submitHandler={this.props.submitHandler}/>
        <br></br>
        <TransactionList  transactions={this.props.transactions} deleteTransaction={this.props.deleteTransaction}/>
        </>
    )
    }
}

export default FinanceContainer