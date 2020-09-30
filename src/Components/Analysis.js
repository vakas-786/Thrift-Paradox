import React from 'react'
import '../App.css'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


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


        const data = [
          {
            name: 2020, uv: this.props.savings, pv: this.props.savings
          },
          {
            name: 2021, uv: thriftOne.toFixed(2), pv: bankOne.toFixed(2)
          },
          {
            name: 2022, uv: thriftTwo.toFixed(2), pv: bankTwo.toFixed(2),
          },
          {
            name: 2023, uv: thriftThree.toFixed(2), pv: bankThree.toFixed(2),
          },
          {
            name: 2024, uv: thriftFour.toFixed(2), pv: bankFour.toFixed(2),
          },
          {
            name: 2025, uv: thriftFive.toFixed(2), pv: bankFive.toFixed(2),
          },
          {
            name: 2026, uv: thriftSix.toFixed(2), pv: bankSix.toFixed(2),
          },
          {
            name: 2027, uv: thriftSeven.toFixed(2), pv: bankSeven.toFixed(2),
          },
          {
            name: 2028, uv: thriftEight.toFixed(2), pv: bankEight.toFixed(2),
          },
          {
            name: 2029, uv: thriftNine.toFixed(2), pv: bankNine.toFixed(2),
          },
          {
            name: 2030, uv: thriftTen.toFixed(2), pv: bankTen.toFixed(2),
          },
    
        ]
        
        return(
            <>
            <h1 className="text-center" style={{color: "white"}}>Analysis</h1>
            <div className="graph-container">
        <h4 style={{color: "white"}}>Thrift Paradox Savings Over 10 Years</h4>
        <AreaChart
          width={400}
          height={250}
          data={data}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 20000]} />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        <p style={{color: "white"}}>Other Banks</p>
        <AreaChart
          width={400}
          height={250}
          data={data}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 10000]} />
          <Tooltip />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </div>
      </>
        )
    }
}

export default Analysis