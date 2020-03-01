import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Navbar from '../common/Navbar'
import UserCardIndex from './UserCards'
import UserCollectionIndex from './UserCollections'

import Authorize from '../../lib/authorize'

class MyProfile extends React.Component {
  
  state = {
    tabIndex: 0,
    userInfo: null,
    userCards: null,
    userCollections: null
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

  render() {
    const { userInfo } = this.state
    if (!userInfo) return null
    return (
      <>
      <Navbar />
      <section className="section">
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
              {this.state.userCards.length !== 0 ? <UserCardIndex cardData={this.state.userCards} /> : <h1 className="subtitle is-6">No Cards yet. <Link to="/marketplace">Buy cards</Link></h1>}
            </TabPanel>
            <TabPanel>
              {this.state.userCards.length !== 0 ? <UserCollectionIndex collectionData={this.state.userCollections} /> : <h1 className="subtitle is-6">No Collections yet. <Link to="/marketplace">Buy card packs</Link></h1>} 
            </TabPanel>
          </Tabs>
        </div>
      </section>
      </>
    )
  }
}

export default MyProfile