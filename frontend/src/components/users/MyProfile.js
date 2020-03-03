import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Navbar from '../common/Navbar'

import UserCardIndex from './UserCards'
import UserCardModal from './UserCardModals'
import UserCollectionIndex from './UserCollections'
import UserCollectionModal from './UserCollectionModals'

import Authorize from '../../lib/authorize'

import ProfileBackground from '../../assets/profile-page-background.jpg'

class MyProfile extends React.Component {
  
  state = {
    isModalOpen: false,
    tabIndex: 0,
    userInfo: null,
    userCards: null,
    userCollections: null,
    currentCard: null,
    currentCollection: null
  }
  
  async componentDidMount() {
    try {
      const res = await axios.get('/api/users/my-profile/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.setState({ userInfo: res.data, userCards: res.data.cards, userCollections: res.data.collections })
    } catch (err) {
      console.log(err)
    }
  }

  refreshProfile = async () => {
    try {
      const res = await axios.get('/api/users/my-profile/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.setState({
        isModalOpen: false,
        userInfo: res.data, 
        userCards: res.data.cards, 
        userCollections: res.data.collections,
        currentCard: null,
        currentCollection: null
      })
    } catch (err) {
      console.log(err.response)
    }
  }

  setCurrentCard = (cardId) => {
    this.setState({ currentCard: this.state.userCards.find(card => card.id === cardId), isModalOpen: true })
  }

  sellCurrentCard = async (cardId) => {
    try {
      await axios.get(`/api/cards/${cardId}/sell/`, {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.refreshProfile()
    } catch (err) {
      console.log(err.response)
    }
  }

  sellCurrentCollection = async (collId) => {
    try {
      await axios.get(`/api/collections/${collId}/sell/`, {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.refreshProfile()
    } catch (err) {
      console.log(err.response)
    }
  }
  
  setCurrentCollection = (collectionId) => {
    this.setState({ currentCollection: this.state.userCollections.find(coll => coll.id === collectionId), isModalOpen: true })
  }

  clearModal = () => {
    this.setState({ currentCard: null, currentCollection: null, isModalOpen: false })
  }

  render() {
    const { userInfo } = this.state
    if (!userInfo) return null
    console.log(this.state.currentCollection)
    return (
      <>
      <Navbar />
      <section className="section" style={{height: '95vh', overflowY: 'scroll', backgroundImage: `url(${ProfileBackground})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container">
          <h1 className="title is-1 has-text-black">{userInfo.alias}</h1>
          <hr />
          <div className="columns">
            <div className="column is-one-third">
              <div className="container is-fluid">
                <figure className="image" style={{
                  backgroundImage: `url(${userInfo.profile_image})`, 
                  backgroundPosition: 'center', backgroundSize: '100% 100%', 
                  borderRadius: '100%', height: '240px', width: '240px', 
                  margin: '0px auto'}}>
                </figure>
                <br />
                <div className="level">
                  <div className="level-left" style={{width: 'fit-content', margin: '0'}}>
                    <small>Coins: {userInfo.coins}</small>
                  </div>
                  <div className="level-right" style={{width: 'fit-content', margin: '0'}}>
                    <small>Xp: {userInfo.xp}</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-two-third">
              <div className="container is-fluid">
                <h2 className="title is-3 has-text-black">Name</h2>
                <h3 className="subtitle is-5 has-text-black">{userInfo.first_name} {userInfo.last_name}</h3>
                <hr />
                <h2 className="title is-3 has-text-black">Email</h2>
                <h3 className="subtitle is-5 has-text-black">{userInfo.email}</h3>
                <hr />
                <h2 className="title is-3 has-text-black">Username</h2>
                <h3 className="subtitle is-5 has-text-black">{userInfo.username}</h3>
                <hr />
              </div>
            </div>
          </div>
          <Tabs 
            selectedIndex={this.state.tabIndex} 
            onSelect={tabIndex => this.setState({ tabIndex })}
          >
            <TabList>
              <Tab></Tab>
              <Tab></Tab>
            </TabList>
            <div className="tabs is-centered is-large is-boxed is-fullwidth">
            <ul>
              <li className={`${this.state.tabIndex === 0 ? 'is-active' : ''}`} onClick={() => this.setState({ tabIndex: 0 })}>
                <a href="#">My Cards</a>
              </li>
              <li className={`${this.state.tabIndex === 1 ? 'is-active' : ''}`} onClick={() => this.setState({ tabIndex: 1 })}>
                <a href="#">My Collections</a>
              </li>
            </ul>
          </div>
            <TabPanel>
              {this.state.userCards.length !== 0 ? <UserCardIndex cardData={this.state.userCards} clickHandler={this.setCurrentCard} /> : <h1 className="subtitle is-6">No Cards yet. <Link to="/marketplace">Buy cards</Link></h1>}
            </TabPanel>
            <TabPanel>
              {this.state.userCards.length !== 0 ? <UserCollectionIndex collectionData={this.state.userCollections} clickHandler={this.setCurrentCollection} /> : <h1 className="subtitle is-6">No Collections yet. <Link to="/marketplace">Buy card packs</Link></h1>} 
            </TabPanel>
          </Tabs>
          {this.state.isModalOpen && 
            <div className="modal is-active">
              <div className="modal-background" onClick={this.clearModal}></div>
              {this.state.currentCard && 
                <UserCardModal 
                  currentCard={this.state.currentCard} 
                  clearModal={this.clearModal} 
                  sellHandler={this.sellCurrentCard} 
                />
              }
              {this.state.currentCollection && 
                <UserCollectionModal 
                  currentColl={this.state.currentCollection} 
                  clearModal={this.clearModal}
                  sellHandler={this.sellCurrentCollection}
                />
              }
            </div>
          }
        </div>
      </section>
      </>
    )
  }
}

export default MyProfile