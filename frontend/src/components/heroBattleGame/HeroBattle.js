import React from 'react'
import axios from 'axios'

import Authorize from '../../lib/authorize'

import Navbar from '../common/Navbar'
import HeroSearchForm from '../heroCompare/HeroSearchForm'
import GameModal from './GameModal'

import HeroBattleBackground from '../../assets/hero-battle-carousel.jpeg'

class HeroBattle extends React.Component {
  
  state = {
    battleChallenges: [
      {
        name: 'The Million Mile Dash',
        description: 'Both heroes will race around the earth\'s equator 252 times. First to the finish wins!',
        attributes: ['speed', 'durability']
      },
      {
        name: '4D Chess',
        description: 'Both heroes will play a game of chess on a 4-dimensional chessboard',
        attributes: ['intelligence', 'speed']
      },
      {
        name: 'Weight Lifting',
        description: 'Both heroes will compete in a weight-lifting contest where they will have to bench and deadlift immensely heavy objects until somebody quits.',
        attributes: ['strength', 'power', 'durability']
      },
      {
        name: 'Arm Wrestling',
        description: 'Pretty self-explanatory. Best of 3, winner takes all!',
        attributes: ['strength', 'power']
      },
      {
        name: 'Mortal Combat',
        description: 'A battle to the death. Last man (or woman) standing wins.',
        attributes: ['combat', 'intelligence', 'power']
      },
      {
        name: 'Saving the Day',
        description: 'An intergalactic superbeing (with an alien army) is attacking a populated city. Defeat this powerful foe and save as many lives as possible. This is the ultimate test of a superhero; whoever does the best job wins.',
        attributes: ['intelligence', 'power', 'durability', 'strength', 'speed', 'combat']
      }
    ],
    userInfo: null,
    playerCards: [],
    compCards: null,
    playerChoice: [],
    compChoice: null,
    gameInPlay: false,
    isModalOpen: false,
    chosenChallenge: [],
    winner: '',
    playerWinnings: null,
    cardLevelUp: null
  }

  async componentDidMount() {
    try {
      const res = await Promise.all([
        axios.get('/api/cards/'),
        axios.get('/api/users/my-profile/', {
          headers: {
            Authorization: `Bearer ${Authorize.getToken()}`
          }
        })
      ])
      const chosenChallenge = this.state.battleChallenges[Math.floor(Math.random() * this.state.battleChallenges.length)]
      const compCards = res[0].data.filter(card => !card.owner || card.owner.username === 'admin')
      const playerCards = res[1].data.cards
      this.setState({ 
        userInfo: res[1].data, 
        compCards, playerCards, 
        playerChoice: playerCards[0],
        chosenChallenge
      })
    } catch(err) {
      console.log(err)
    }
  }

  refreshGame = async () => {
    try {
      const res = await Promise.all([
        axios.get('/api/cards/'),
        axios.get('/api/users/my-profile/', {
          headers: {
            Authorization: `Bearer ${Authorize.getToken()}`
          }
        })
      ])
      const chosenChallenge = this.state.battleChallenges[Math.floor(Math.random() * this.state.battleChallenges.length)]
      const compCards = res[0].data.filter(card => !card.owner || card.owner.username === 'admin')
      const playerCards = res[1].data.cards
      this.setState({ 
        userInfo: res[1].data, 
        compCards, playerCards, 
        playerChoice: playerCards[0],
        chosenChallenge
      })
    } catch(err) {
      console.log(err)
    }
  }

  endGame = async () => {

    const { winner, playerWinnings, playerChoice, cardLevelUp } = this.state
    
    this.setState({
      userInfo: null,
      playerCards: [],
      compCards: null,
      playerChoice: [],
      compChoice: null,
      gameInPlay: false,
      isModalOpen: false,
      chosenChallenge: [],
      winner: '',
      playerWinnings: null,
      cardLevelUp: null
    })

    const playerDataJSON = JSON.stringify(playerWinnings)

    if (winner === 'playerChoice') {
      try {
        await Promise.all([
          axios.get('/api/users/my-profile/update/', { 
            headers: {
              Authorization: `Bearer ${Authorize.getToken()}`,
              playerData: playerDataJSON
            },
          }),
          axios.put(`/api/cards/${playerChoice.id}/level-up/`, cardLevelUp)
        ])
        this.refreshGame()
        return
      } catch (err) {
        console.log(err.response)
      }
    }

    this.refreshGame()
  }

  completeGame = () => {
    let cardLevelUp, cardAttrs, playerWinnings
    const { winner, playerChoice, chosenChallenge, userInfo } = this.state

    if (winner === 'playerChoice') {
      cardAttrs = chosenChallenge.attributes.map(attr => [attr, playerChoice[attr] + 2])
      cardLevelUp = Object.fromEntries(cardAttrs)
      playerWinnings = {
        coins: userInfo.coins + 20,
        xp: userInfo.xp + 50
      }
      this.setState({ playerWinnings, cardLevelUp, isModalOpen: true })
    }

    this.setState({ isModalOpen: true })
  }
  
  handleChange = (e) => {
    const heroChoice = this.state.playerCards.filter(item => item.id === parseInt(e.target.value))[0]
    this.setState({ [e.target.name]: heroChoice })
  }

  getRandomHero = (e) => {
    e.preventDefault()
    const heroChoice = this.state.playerCards[Math.floor(Math.random() * this.state.playerCards.length)]
    this.setState({ [e.target.name]: heroChoice })
  }

  getRandomCompCard = () => {
    let compHero
    const { playerChoice, compCards } = this.state
    const viableHeroes = compCards.filter(card => Math.abs(card.overall - playerChoice.overall) <= 5 && card.name !== playerChoice.name )
    if (viableHeroes.length > 0) compHero = viableHeroes[Math.floor(Math.random() * viableHeroes.length)]
    else compHero = compCards[Math.floor(Math.random() * compCards.length)]
    return compHero
  }

  setChallenge = () => {
    const compChoice = this.getRandomCompCard()
    this.setState({ compChoice, gameInPlay: true })
  }

  findWinner = () => {
    const { playerChoice, compChoice, chosenChallenge } = this.state
    let playerTotal = 0
    let compTotal = 0

    chosenChallenge.attributes.map(attr => {
      playerTotal += playerChoice[attr]
      compTotal += compChoice[attr]
    })

    playerTotal /= chosenChallenge.attributes.length
    compTotal /= chosenChallenge.attributes.length

    if (playerTotal > compTotal) this.setState({ winner: 'playerChoice' })
    else if (compTotal > playerTotal) this.setState({ winner: 'compChoice' })
    else this.setState({ winner: 'Draw' })

    console.log('Player:', playerTotal, 'Computer:', compTotal)
  }

  render() {
    if (!this.state.playerChoice) return false
    const { playerChoice, playerCards, gameInPlay, chosenChallenge, compChoice, winner, isModalOpen } = this.state
    return (
      <>
      <Navbar />
      <section className="section" style={{ height: '95vh', overflowY: 'scroll', backgroundImage: `url(${HeroBattleBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
        <div className="hero is-small is-dark">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1 has-text-centered has-text-white">SUPERHERO BATTLE</h1>
              <h2 className="subtitle is-5 has-text-centered has-text-white">Put your cards to the test in the ultimate battle of champions!</h2>
            </div>
          </div>
        </div>
          <hr />
          {playerChoice.length !== 0 ?
          <>
          <div className="container has-text-centered">
            {gameInPlay && winner ? 
              <button className="button is-success" onClick={this.completeGame}>Complete Game</button> 
              : gameInPlay ? 
              <button className="button is-danger" onClick={this.findWinner}>BATTLE!!!</button> 
              : <button className="button is-info" onClick={this.setChallenge}>Start</button>}
          </div>
          <br />
            <div className="columns is-vcentered">
              <div className="column is-4">
                {playerChoice.length !== 0 ? 
                <>
                  {!gameInPlay && 
                    <>
                    <HeroSearchForm 
                      choiceObject={playerChoice}
                      heroData={playerCards}
                      handleChange={this.handleChange}
                      name={'playerChoice'}
                      getRandomHero={this.getRandomHero}
                    />
                    <br />
                    </>
                  }
                  {gameInPlay && winner && 
                    <h1 className="title is-1">{this.state.winner === 'playerChoice' ? 
                    'Winner' : this.state.winner === 'compChoice' ? 'Loser' : 'Draw'}</h1>
                  }
                  <div className="card is-fullheight">
                    <div className="card-image">
                      <figure className="image is-squared">
                        <img src={playerChoice.image} alt="something" />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h2 className="title is-3">{playerChoice.name}</h2>
                    </div>
                  </div>
                </>
                : <h1>Loading playing cards...</h1>
                }
              </div>
              <div className="column is-4">
                <div className="container has-text-centered">
                  {playerChoice.length !== 0 &&
                  <>
                    <h1 className="title is-1 has-text-centered">VS</h1>
                    {chosenChallenge.attributes && 
                      <div className="container">
                        <h1 className="title is-4 has-text-white">{chosenChallenge.name}</h1>
                        <p className="subtitle is-6 has-text-white">{chosenChallenge.description}</p>
                        <p className="has-text-white">Key Attributes: {chosenChallenge.attributes.join(', ')}</p>
                      </div>
                    }
                  </>
                  }
                </div>
              </div>
              <div className="column is-4">
                {playerChoice.length !== 0 &&
                  <>
                  {!gameInPlay && 
                  <>
                    <br />
                    <br />
                    <br />
                    <br />
                  </>
                  }
                  {gameInPlay && winner && 
                    <h1 className="title is-1">{this.state.winner === 'compChoice' ? 
                    'Winner' : this.state.winner === 'playerChoice' ? 'Loser' : 'Draw'}</h1>
                  }
                  <div className="card is-fullheight">
                    <div className="card-image">
                      <figure className="image is-squared">
                        <img src={compChoice ? compChoice.image : `https://previews.123rf.com/images/pixxart/pixxart1308/pixxart130800008/21326902-question-mark-in-pop-art-style.jpg`} alt="something" />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h2 className="title is-3">{compChoice ? compChoice.name : 'Computer Choice'}</h2>
                    </div>
                  </div>
                  </>             
                }
              </div>
            </div>
          </>
          : 
          <>
          <h1 className="title is-1 has-text-white">Setting the battlefield...</h1>
          <progress className="progress is-large is-info" max="100">60%</progress>
          </>
          }
          {isModalOpen && 
            <div className="modal is-active">
              <div className="modal-background"></div>
              <GameModal winner={winner} resetHandler={this.endGame}/>
            </div>
          }
        </div>
      </section>
      </>
    )
  }
}

export default HeroBattle