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
        let originalAmount = this.props.account.saving
        
        let thriftOne = (originalAmount * 0.30) + originalAmount
        let bankOne = (originalAmount * 0.15) + originalAmount

        let thriftTwo = (thriftOne * 0.30) + thriftOne
        let bankTwo = (bankOne * 0.15) + bankOne

        let thriftThree = (thriftTwo * 0.30) + thriftTwo
        let bankThree = (bankTwo * 0.15) + bankTwo

        let thriftFour = (thriftThree * 0.30) + thriftThree
        let bankFour = (bankThree * 0.15) + bankThree

        let thriftFive = (thriftFour * 0.30) + thriftFour
        let bankFive = (bankFour * 0.15) + bankFour

        let thriftSix = (thriftFive * 0.30) + thriftFive
        let bankSix = (bankFive * 0.15) + bankFive

        let thriftSeven = (thriftSix * 0.30) + thriftSix
        let bankSeven = (bankSix * 0.15) + bankSix

        let thriftEight = (thriftSeven * 0.30) + thriftSeven
        let bankEight = (bankSeven * 0.15) + bankSeven

        let thriftNine = (thriftEight * 0.30) + thriftEight
        let bankNine = (bankEight * 0.15) + bankEight

        let thriftTen = (thriftNine * 0.30) + thriftNine
        let bankTen = (bankNine * 0.15) + bankNine


        const Intdata = [
          {
            name: 2020, thrift: this.props.savings, avg: this.props.savings
          },
          {
            name: 2021, thrift: thriftOne.toFixed(2), avg: bankOne.toFixed(2)
          },
          {
            name: 2022, thrift: thriftTwo.toFixed(2), avg: bankTwo.toFixed(2),
          },
          {
            name: 2023, thrift: thriftThree.toFixed(2), avg: bankThree.toFixed(2),
          },
          {
            name: 2024, thrift: thriftFour.toFixed(2), avg: bankFour.toFixed(2),
          },
          {
            name: 2025, thrift: thriftFive.toFixed(2), avg: bankFive.toFixed(2),
          },
          {
            name: 2026, thrift: thriftSix.toFixed(2), avg: bankSix.toFixed(2),
          },
          {
            name: 2027, thrift: thriftSeven.toFixed(2), avg: bankSeven.toFixed(2),
          },
          {
            name: 2028, thrift: thriftEight.toFixed(2), avg: bankEight.toFixed(2),
          },
          {
            name: 2029, thrift: thriftNine.toFixed(2), avg: bankNine.toFixed(2),
          },
          {
            name: 2030, thrift: thriftTen.toFixed(2), avg: bankTen.toFixed(2),
          },
    
        ]
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
          data={Intdata}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 20000]} />
          <Tooltip />
          <Area type="monotone" dataKey="thrift" stroke="#00bfdb" fill='#40f3fa' />
        </AreaChart>
        <p style={{color: "white"}}>Other Banks</p>
        <AreaChart
          width={400}
          height={250}
          data={Intdata}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
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