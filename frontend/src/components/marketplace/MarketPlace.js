import React from 'react'
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Authorize from '../../lib/authorize'

import Navbar from '../common/Navbar'
import MarketCardIndex from './MarketCardsIndex'
import MarketCardModal from './MarketCardModal'
import MarketCollectionIndex from './MarketCollectionIndex'
import MarketCollectionModal from './MarketCollectionModals'

import MarketPlaceHero from '../../assets/marketplace-carousel.jpg'
import MarketPlaceBackground from '../../assets/hero-directory-background.png'

class MarketPlace extends React.Component {
  
  state = {
    isModalOpen: false,
    tabIndex: 0,
    userInfo: null,
    cards: null,
    searchCards: null,
    collections: null,
    searchCollections: null,
    currentCard: null,
    currentCollection: null
  }

  async componentDidMount() {
    try {
      const res = await Promise.all([
        axios.get('/api/cards/', {
          timeout: 100000
        }),
        axios.get('/api/collections/'),
        axios.get('/api/users/my-profile', {
          headers: {
            Authorization: `Bearer ${Authorize.getToken()}`
          }
        })
      ])
      const allCards = res[0].data.filter(card => (!card.owner || card.owner.username === 'admin') && card.collections.length === 0)
      const allCollections = res[1].data.filter(coll => coll.owner.username === 'admin')
      this.setState({
        cards: allCards,
        searchCards: allCards,
        collections: allCollections,
        searchCollections: allCollections,
        userInfo: res[2].data
      })
    } catch(err) {
      console.log(err)
    }
  }

  refreshMarket = async () => {
    try {
      const res = await Promise.all([
        axios.get('/api/cards/', {
          timeout: 100000
        }),
        axios.get('/api/collections/'),
        axios.get('/api/users/my-profile', {
          headers: {
            Authorization: `Bearer ${Authorize.getToken()}`
          }
        })
      ])
      const allCards = res[0].data.filter(card => (!card.owner || card.owner.username === 'admin') && card.collections.length === 0)
      const allCollections = res[1].data.filter(coll => coll.owner.username === 'admin')
      this.setState({
        isModalOpen: false,
        tabIndex: 0,
        cards: allCards,
        searchCards: allCards,
        collections: allCollections,
        searchCollections: allCollections,
        userInfo: res[2].data
      })
    } catch(err) {
      console.log(err)
    }
  }

  
  setCurrentCard = (cardId) => {
    this.setState({ currentCard: this.state.searchCards.find(card => card.id === cardId), isModalOpen: true })
  }

  buyCurrentCard = async (cardId) => {
    
    const { userInfo, currentCard } = this.state

    if (userInfo.coins < currentCard.price) {
      alert('You can\'t afford that mate!')
      return
    }

    try {
      await axios.get(`/api/cards/${cardId}/buy/`, {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.setState({
        isModalOpen: false,
        tabIndex: 0,
        userInfo: null,
        cards: null,
        searchCards: null,
        collections: null,
        searchCollections: null,
        currentCard: null,
        currentCollection: null
      })
      this.refreshMarket()
    } catch (err) {
      console.log(err.response)
    }
  }

  buyCurrentCollection = async (collId) => {

    const { userInfo, currentCollection } = this.state

    if (userInfo.coins < currentCollection.value) {
      alert('You can\'t afford that mate!')
      return
    }

    try {
      await axios.get(`/api/collections/${collId}/buy/`, {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.setState({
        isModalOpen: false,
        tabIndex: 0,
        userInfo: null,
        cards: null,
        searchCards: null,
        collections: null,
        searchCollections: null,
        currentCard: null,
        currentCollection: null
      })
      this.refreshMarket()
    } catch (err) {
      console.log(err.response)
    }
  }
  
  setCurrentCollection = (collectionId) => {
    this.setState({ currentCollection: this.state.searchCollections.find(coll => coll.id === collectionId), isModalOpen: true })
  }
  
  basicCardSearch = (e) => {
    const searchString = e.target.value.trim()
    const { cards } = this.state
    const filteredCards = cards.filter(card => card.name.toLowerCase().includes(searchString.toLowerCase()))
    this.setState({ searchCards: filteredCards })
  }
  
  basicCollectionSearch = (e) => {
    const searchString = e.target.value
    const { collections } = this.state
    const filteredCollections = collections.filter(coll => coll.name.toLowerCase().includes(searchString.toLowerCase()))
    this.setState({ searchCollections: filteredCollections })
  }
  
  clearModal = () => {
    this.setState({ currentCard: null, currentCollection: null, isModalOpen: false })
  }

  changeTabs = (tabIndex) => {
    this.setState({ tabIndex, searchCards: this.state.cards, searchCollections: this.state.collections })
  }

  render() {
    const { searchCards, searchCollections, isModalOpen, currentCard, currentCollection, userInfo } = this.state
    return (
      <>
      <Navbar />
      <div style={{ height: '95vh', overflowY: 'scroll', display: 'flex', flexDirection: 'column' }}>
        <div className="hero is-medium is-success" style={{backgroundImage: `url(${MarketPlaceHero})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
          <div className="hero-body">
            <div className="container shadow-box">
              <h1 className="title is-1 has-text-centered light-text-title">Welcome to the Marketplace</h1>
              <h2 className="subtitle is-4 has-text-centered light-text-title">Explore over 8000 playing cards and collections</h2>
            </div>
          </div>
        </div>
        <section className="section" style={{ backgroundImage: `url(${MarketPlaceBackground})`, flexGrow: '1' }}>
          {userInfo &&
            <>
            <div className="container shadow-box">
              <h3 className="subtitle is-4 has-text-centered light-text-title">My Balance: W${userInfo.coins}</h3>
            </div>
            <br />
            </>
          }
          <div className="container">
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
              <TabList>
                <Tab></Tab>
                <Tab></Tab>
              </TabList>
              <div className="tabs is-centered is-large is-fullwidth">
                <ul>
                  <li className={`${this.state.tabIndex === 0 ? 'is-active' : ''}`} onClick={() => this.changeTabs(0)}>
                    <a href="#">
                      <p className="light-text-title">Cards</p>
                    </a>
                  </li>
                  <li className={`${this.state.tabIndex === 1 ? 'is-active' : ''}`} onClick={() => this.changeTabs(1)}>
                    <a href="#">
                      <p className="light-text-title">Card Collections</p>
                    </a>
                  </li>
                </ul>
              </div>
              <TabPanel>
                {searchCards ?
                  <>
                  <form>
                    <div className="field has-addons">
                      <div className="control is-expanded">
                        <input 
                          className="input" 
                          type="text"
                          placeholder="Search for cards"
                          onChange={this.basicCardSearch}
                        />
                      </div>
                      <div className="control">
                        <button className="button is-danger">Advanced Search</button>
                      </div>
                      <div className="control">
                        <button className="button is-success">Search</button>
                      </div>
                    </div>
                  </form>
                  <MarketCardIndex cardData={searchCards} clickHandler={this.setCurrentCard} />
                  </> 
                  : 
                  <>
                  <h1 className="title is-1 light-text-title">Loading Cards...</h1>
                  <progress className="progress is-large is-success" max="100">60%</progress>
                  </>
                  }
              </TabPanel>
              <TabPanel>
                {searchCollections ?
                  <>
                  <form>
                    <div className="field has-addons">
                      <div className="control is-expanded">
                        <input 
                          className="input" 
                          type="text"
                          placeholder="Search for collections"
                          onChange={this.basicCollectionSearch}
                        />
                      </div>
                      <div className="control">
                        <button className="button is-danger">Advanced Search</button>
                      </div>
                      <div className="control">
                        <button className="button is-success">Search</button>
                      </div>
                    </div>
                  </form>
                  <MarketCollectionIndex collectionData={searchCollections} clickHandler={this.setCurrentCollection} /> 
                  </>
                  :
                  <>
                  <h1 className="title is-1 light-text-title">Loading Collections...</h1>
                  <progress className="progress is-large is-success" max="100">60%</progress>
                  </>
                  }
              </TabPanel>
            </Tabs>
            {isModalOpen && 
              <div className="modal is-active">
                <div className="modal-background" onClick={() => this.setState({ isModalOpen: false })}></div>
                {currentCard && 
                  <MarketCardModal 
                    currentCard={currentCard} 
                    clearModal={this.clearModal}
                    buyHandler={this.buyCurrentCard}
                  />
                }
                {currentCollection && 
                  <MarketCollectionModal 
                    currentColl={currentCollection} 
                    clearModal={this.clearModal}
                    buyHandler={this.buyCurrentCollection}
                  />
                }
              </div>
            }
          </div>
        </section>
      </div>
      </>
    )
  }
}

export default MarketPlace