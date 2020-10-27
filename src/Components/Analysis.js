import React from 'react'
import '../App.css'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend,} from 'recharts';
import { Input, Badge } from 'reactstrap'

class Analysis extends React.Component {

  state = {
    savings: 0,
    currency: [],
    rates: [],
    selected: '',

   }

  fetchTransactions = () => {
    let token = localStorage.getItem("token")
    fetch('https://thrift-paradox-api.herokuapp.com/transactions', {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.json())
    .then(data => {
      let savings = data.saving
      this.setState({savings: savings})
    })
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
}

  componentDidMount() {
    this.fetchTransactions()
    this.props.fetchAccount()
    this.props.fetchUser()
    fetch( 'https://api.exchangeratesapi.io/latest?base=USD' )
    .then(response => response.json())
    .then(data =>{
      this.setState({rates: data.rates})
      this.setState({ currency: Object.keys(data.rates)})
    })
  }


  currencyOption = () => {
    let currency = this.state.currency.filter(currency => currency !== 'USD')
    return currency.map((currency, index)=> <option key={index} value={currency}>{currency}</option>)
    }

    render() {
        
       let compoundedInterest = [...Array(11).keys()].map(year => { 
          let hash = Object()
          hash['year'] = (2020+year)
          hash['thrift'] = parseFloat((this.props.account.saving*(1.3**year)).toFixed(2))
          hash['avg'] = parseFloat((this.props.account.saving*(1.15**year)).toFixed(2))
          return hash
       })

        let newRates = (() => {
          return (this.props.savings * this.state.rates[this.state.selected]).toFixed(2)
        })()
        
        const data = [
          {
            name: 'Value of Savings in Foreign Currencies', USD: this.props.savings, Foreign: newRates
          }
        ]

        return(
            <>
            <div className= 'barchart'>
            <h3 className='text-center'>Rate:<Badge color="secondary">{this.state.selected === '' ? 'Select a Currency' :(100*(this.state.rates[this.state.selected]/100)).toFixed(2)}</Badge></h3>
            <h4 className='text-center' style={{color: "white", padding: '10px', margin: '20px' }}>Foreign Exchange Rates</h4> 
            <br></br>
            <br></br>
            <Input style={{backgroundColor: '#525f7f', color: "white", padding: '5px', width: '13%', margin: '-60px' }} type="select" defaultValue='select' name='selected'  placeholder='Select a Category' onChange={this.changeHandler}>
                <option  value='select' disabled >Rate</option>
                {this.currencyOption()}
              </Input> 
        <BarChart 
        width={500}
        height={550}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="USD" fill="#40f3fa"/>
        <Bar dataKey="Foreign" fill= '#FF4346'/>
      </BarChart> 
      <br></br>
      
        </div>
            <div className="graph-container" >
        <h4 style={{color: "white", padding: '10px' }}>Thrift Paradox Savings Over 10 Years</h4>
        <div className='area-chart-grid'>
        <AreaChart
          width={400}
          height={250}
          data={compoundedInterest}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis type="number" domain={[0, 20000]} />
          <Tooltip />
          <Area type="monotone" dataKey="thrift" stroke="#00bfdb" fill='#40f3fa' />
        </AreaChart>
        <p style={{color: "white"}}>Other Banks</p>
        <AreaChart
          width={400}
          height={250}
          data={compoundedInterest}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis type="number" domain={[0, 10000]} />
          <Tooltip />
          <Area type="monotone" dataKey="avg" stroke="#82ca9d" fill="#1ddb00" />
        </AreaChart>
        </div>
      </div>
      </>
        )
    }
}

export default Analysis