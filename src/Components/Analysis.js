import React from 'react'
import '../App.css'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import { VictoryPie } from 'victory';


// [1.....10].map(bank => { {name:(2020+bank), money: originalamount *(1.3^bank}))
//try this out later 

class Analysis extends React.Component {

  state = {
    savings: 0
   }

  fetchTransactions = () => {
    fetch('http://localhost:3000/accounts')
    .then(response => response.json())
    .then(data => {
      let savings = data.map(data => data.saving)
      this.setState({savings: savings[0]})
    })
  }

  componentDidMount() {
    this.fetchTransactions()
  }

    render() {
        let originalAmount = this.props.savings
        
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

        return(
            <>
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
        <div className='pie-grid'>
        <VictoryPie
            data={[
              { x: "Cats", y: 35 },
              { x: "Dogs", y: 40 },
              { x: "Birds", y: 55 }
            ]}
            />
            </div>
      </div>
      </>
        )
    }
}

export default Analysis