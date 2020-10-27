
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a >
    <img src="/thrift_demo.gif" width="570" height="390" >
  </a>

  <h1 align="center">Thrift Paradox</h1>

  <p align="center">
    A personal expense tracker that rewards users for saving money with digital prizes. 
    <br />
    <br />
    <a href="https://thrift-paradox.herokuapp.com/">Live Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Demo</a>
    .
    <a href='https://github.com/vakas-786/Thrift-Paradox-Backend'>Backend Repo</a>
</p>
</p>

## Login
Create an account or login with the following credentials:
* Username: testing
* Password: password


<!-- ABOUT THE PROJECT -->
## About The Project
The name of the app, "Thrift Paradox" was inspired by the name of an economic theory called the Paradox of Thrift. The theory argues that personal savings can be detrimental to overall economic growth, especially during a recession. It is based on a circular flow of the economy in which current spending drives future spending. Today, the nation finds itself in a tough economic situation and many, rightfully so, are looking to save as much as they can to ensure a secure a future while making ends meet.<br></br>
My app is a personal expense tracker that allows users to enter in their transactions, edit, and delete them. In the main dashboard users can find their total income and expenses along with their balance. These numbers are calculated from the entered transactions. Users are able to take a portion of their balance and place it in their savings account as well. When a user places $2000 or more into their savings account, they are awarded a digital prize that can be redeemed for cash. By rewarding users for saving money for the long term, it allows them to potentially have enough cash to spend short term and effecitvely solve the issue that the Paradox of Thrift presented. There is also an analysis portion within the app that calculates the value of your savings account with compounded interest after ten years. With the help of the exchange rates API users can also see what the value of their savings are in other currencies displayed on a bar graph. 


### Built With

* React.js
* Ruby on Rails
* PostgreSQL
* Bootstrap
* ReactStrap 
* Recharts (Data Visualization)
* Exchange Rates API
* JWT Auth
* Game Art 2D (Prize Sprites)




<!-- USAGE EXAMPLES -->
## Technical Challenges

<b>1) Lottery System</b> <br>
A user is awarded a token once they save up to $2000. In order to check if the user has a token to enter the lottery and award them a prize, I created a custom route /lottery which randomly selected a prize. I also implented callbacks from the Prize controller to then remove the token after entering the lottery. The status of the prize is set from false to true as well. Prizes are only rendered on a user's profile in a prize's status is true. This also prevents a user from having duplicate prizes. <br></br>
<b>Prize Controller</b>
```sh
   def lottery
        if current_user.token > 0 
        prizes = current_user.prizes 
        @random = prizes.sample
        Prize.removeToken(@random)
        Prize.changeStatus(@random)
        render json: @random 
        else 
            render json: { error: 'insufficient amount of lottery tokens' }, status: :not_acceptable
        end
   end 
```
<b>Prize.rb</b>
```
class Prize < ApplicationRecord
  belongs_to :user

  def self.changeStatus(prize)
    prize.update(status: true)
  end 

  def self.removeToken(prize)
    tokenValue = prize.user.token
    prize.user.update(token: tokenValue -1)
  end 
end
```
<br>
<b>2) Analysis Charts</b> <br>
The analysis portion of the app uses the recharts library for data visualization. The cartesian graph displayed the user's savings amount after 10 years with compounded interest. The bar graph displayed the user's savings amount on the red bar and the amount in foreign currencies on the blue bar.<br>

The values were calculated for 10 years using 30% as the interest rate for a Thrift paradox savings account and 15% for the other savings account. Once the amounts were calculated, they were passed down as a hash to the variable Intdata which was used to populate the cartesian graph. Below is a snippet of the code that was used to calculate the compounded interest:
```sh
let compoundedInterest = [...Array(11).keys()].map(year => { 
          let nameHash = Object()
          nameHash['name'] = (2020+year)
          nameHash['thrift'] = parseFloat((this.props.account.saving*(1.3**year)).toFixed(2))
          nameHash['avg'] = parseFloat((this.props.account.saving*(1.15**year)).toFixed(2))
          return nameHash
       })

        const Intdata = [compoundedInterest][0]
```

The bar graph utilized the exchange rates API to calculate the value of the users savings account in their selected currency. The API returned the following data:<br>
(Disclaimer: value of rates may differ since they are updated daily)
```sh
{
rates: {
CAD: 1.3182164312,
HKD: 7.7500634571,
ISK: 139.8595481851,
PHP: 48.4008799391,
DKK: 6.2959641256,
HUF: 308.8416955749,
CZK: 23.0941704036,
GBP: 0.7678737626,
RON: 4.1245452238,
SEK: 8.7549708097,
IDR: 14714.400541501,
INR: 74.0743717743,
BRL: 5.6446399865,
RUB: 76.3969032913,
HRK: 6.4117099585,
JPY: 105.0342668584,
THB: 31.280142144,
CHF: 0.9069295203,
EUR: 0.8460952703,
MYR: 4.1644809206,
BGN: 1.6547931297,
TRY: 8.0880785176,
CNY: 6.7130890938,
NOK: 9.2617818766,
NZD: 1.4956426094,
ZAR: 16.2517979524,
USD: 1,
MXN: 21.0428124207,
SGD: 1.3617903376,
AUD: 1.4038412725,
ILS: 3.3814197479,
KRW: 1132.3377612319,
PLN: 3.8750317286
},
base: "USD",
date: "2020-10-26"
}
```


Next I collected the keys from the JSON dataset to use as options for the user to select their desired rate:
```sh
  fetch( 'https://api.exchangeratesapi.io/latest?base=USD' )
      .then(response => response.json())
      .then(data =>{
        this.setState({rates: data.rates})
        this.setState({ currency: Object.keys(data.rates)})
    })
```
I then filtered out USD, since it is our base currency, and rendered the options for users to select from: 
```sh
  currencyOption = () => {
    let currency = this.state.currency.filter(currency => currency !== 'USD')
    return currency.map((currency, index)=> <option key={index} value={currency}>{currency}</option>)
  }
```
Now all that's left is to create a variable containing the data that the graph will render. 
```sh
//newRates returned the new value of the users savings based on the chosen currency

let newRates = (() => {
          return (this.props.savings * this.state.rates[this.state.selected]).toFixed(2)
        })()
        
        const data = [
          {
            name: 'Value of Savings in Foreign Currencies', USD: this.props.savings, Foreign: newRates
          }
        ]
```
<br>

<b>3) Lottery Animation</b> <br>
To add some suspense for the user prior to receiving their prize I added an animation that lasted for a couple seconds. This was done by setting a timer and conditionally rendering a gif that took up the entire size of the screen.<br>

Here is the code for the timer. The gif lasts for 5 seconds, so I set the timer to begin at 5. 
```sh
state ={
        prize: [],
        timeLeft: 5
    }
    
    componentDidMount() {
      this.interval = setInterval(
        () => this.setState({
          timeLeft: this.state.timeLeft - 1
        }), 1000)
      }
      
      componentDidUpdate(prevProps, prevState) {
        console.log("winner", prevProps.user.token)
        console.log("winner", prevState.user)
        if (prevState.timeLeft === 1){
            clearInterval(this.interval)
           }
    }
    
     componenetWillUnmount() {
        clearInterval(this.interval)
    }

```
Then I rendered the prize after checking if the timer was finished 
```sh
render() {
        let image = this.state.prize.image_url
        let name = this.state.prize.name
        return(
            <>
                {this.state.timeLeft > 0
                ?
                <div >
                <img className='prize-image-container' src= {require('../images/lottery.gif')} alt='lottery-gif'/>
                </div>
                :

                <div>
            <h2>Prize</h2>
            <figure className='prize-figure'>
            <img src={image} alt="prize"/>
            <h3 ><figcaption>Congratulations! You just won a {name}!</figcaption></h3>
            </figure>
            <Link to='/profile'><h3 style={{color: 'white'}} className='text-center'><Badge color='success'>Go to Your Profile</Badge></h3></Link>
            </div>
        }
        </>
        )
    }
}
```
