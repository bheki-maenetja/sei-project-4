import React from 'react'
import Navbar from '../common/Navbar'
import axios from 'axios'

import HeroCard from './HeroCard'
import IndexBackground from '../../assets/hero-directory-background.png'

class HeroIndex extends React.Component {
  
  state = {
    data: [],
    searchData: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/heroes/')
      this.setState({ data: res.data, searchData: res.data })
    } catch(err) {
      console.log(err)
    }
  }

  basicSearchFunction = (e) => {
    const searchData = this.state.data.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
    this.setState({ searchData })
  }

  render() {
    return (
      <>
      <Navbar />
      <section className="section" style={{ height: '95vh', overflowY: 'scroll', backgroundImage: `url(${IndexBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
          <div className="hero is-small is-dark">
            <div className="hero-body">
              <div className="container">
                <h1 className="title is-1 has-text-centered has-text-white">THE HERO DIRECTORY</h1>
                <h2 className="subtitle is-5 has-text-centered has-text-white">Find out more about all your favourite heroes</h2>
              </div>
            </div>
          </div>
          <hr />
          <form>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input type="text" className="input" onChange={this.basicSearchFunction} />
              </div>
              <div className="control">
              <button type="submit" className="button is-primary">Search</button>
              </div>
            </div>
          </form>
          <br />
          <div className="columns is-mobile is-multiline">
            {this.state.searchData.map(hero => {
              return (
                <HeroCard {...hero} key={hero.id} />
              )
            })}
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default HeroIndex