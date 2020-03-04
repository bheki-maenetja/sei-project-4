import React from 'react'
import axios from 'axios'

import Navbar from '../common/Navbar'
import HeroSearchForm from './HeroSearchForm'

import HeroCompareBackground from '../../assets/hero-compare-background.jpg'

class HeroCompare extends React.Component {
  
  state = {
    data: [],
    firstChoice: null,
    secondChoice: null,
    gameInPlay: false,
    winner: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get('https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json')
      this.setState({ data: res.data, firstChoice: res.data[0], secondChoice: res.data[0] })
    } catch (err) {
      console.log('Error', err)
    }
  }

  handleChange = (e) => {
    const heroChoice = this.state.data.filter(item => item.id === parseInt(e.target.value))[0]
    this.setState({ [e.target.name]: heroChoice })
  }

  getRandomHero = (e) => {
    e.preventDefault()
    const heroChoice = this.state.data[Math.floor(Math.random() * this.state.data.length)]
    this.setState({ [e.target.name]: heroChoice })
  }

  findWinner = () => {
    const playerStatNames = Object.keys(this.state.firstChoice.powerstats)
    const playerStatValues = playerStatNames.map(item => this.state.firstChoice.powerstats[item])
    const playerTotal = playerStatValues.reduce((acc, i) => acc + i, 0)

    const compStatNames = Object.keys(this.state.secondChoice.powerstats)
    const compStatValues = compStatNames.map(item => this.state.secondChoice.powerstats[item])
    const compTotal = compStatValues.reduce((acc, i) => acc + i, 0)

    if (playerTotal > compTotal) {
      this.setState({ winner: 'firstChoice', gameInPlay: true })
    } else if (compTotal > playerTotal) {
      this.setState({ winner: 'secondChoice', gameInPlay: true })
    } else {
      this.setState({ gameInPlay: true })
    }
    
    console.log('First Choice:', playerTotal, 'Second Choice:', compTotal)
  }

  resetPage = () => {
    this.setState({ 
      gameInPlay: false, 
      gotFirstChoice: false, 
      gotSecondChoice: false, 
      winner: '', 
      firstChoice: this.state.data[0],
      secondChoice: this.state.data[0]
    })
  }


  render() {
    if (!this.state.firstChoice) return false
    const { firstChoice, secondChoice } = this.state
    return (
      <>
      <Navbar />
      <section className="section" style={{ backgroundImage: `url(${HeroCompareBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' , height: '95vh'}}>
        <div className="container">
          <div className="hero is-small is-dark">
            <div className="hero-body">
              <div className="container">
                <h1 className="title is-1 has-text-centered has-text-white">HERO VS HERO</h1>
                <h2 className="subtitle is-5 has-text-centered has-text-white">Find out who would win in a fight between two of your favourite superheroes</h2>
              </div>
            </div>
          </div>
          <hr />
          <div className="container has-text-centered">
            {!this.state.gameInPlay ? <button className="button is-info" onClick={this.findWinner}>Find the Winner</button> : <button className="button is-danger" onClick={this.resetPage}>Reset</button>}
          </div>
          <br />
          <div className="columns">
            <div className="column is-1"></div>
            <div className="column is-5">
              {this.state.gameInPlay ?
              <>
              {this.state.gameInPlay && <h1 className="title is-1 has-text-centered has-text-white">{this.state.winner === 'firstChoice' ? 'Winner' : this.state.winner === 'secondChoice' ? 'Loser' : 'Draw'}</h1>}
              </>
              :
              <>
              <HeroSearchForm
                choiceObject={this.state.firstChoice}
                heroData={this.state.data}
                handleChange={this.handleChange}
                name={'firstChoice'}
                getRandomHero={this.getRandomHero}
              />
              </>
              } 
              <br />
              <div className="card is-fullheight">
                <div className="card-image">
                  <figure className="image is-square">
                    <img src={firstChoice.images.lg} alt="something" />
                  </figure>
                </div>
                <div className="card-content">
                  <h2 className="title is-2">{firstChoice.name}</h2>
                </div>
              </div>
            </div>
            <div className="column is-5">
              {this.state.gameInPlay ? 
              <>
              {this.state.gameInPlay && <h1 className="title is-1 has-text-centered has-text-white">{this.state.winner === 'secondChoice' ? 'Winner' : this.state.winner === 'firstChoice' ? 'Loser' : 'Draw'}</h1>}
              </>
              : 
              <>
              <HeroSearchForm
                choiceObject={this.state.secondChoice}
                heroData={this.state.data}
                handleChange={this.handleChange}
                name={'secondChoice'}
                getRandomHero={this.getRandomHero}
              />
              </>
              }                            
              <br />
              <div className="card is-fullheight">
                <div className="card-image">
                  <figure className="image is-square">
                    <img src={secondChoice.images.lg} alt="something" />
                  </figure>
                </div>
                <div className="card-content">
                  <h2 className="title is-2">{secondChoice.name}</h2>
                </div>
              </div>
            </div>
            <div className="column is-1"></div>
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default HeroCompare