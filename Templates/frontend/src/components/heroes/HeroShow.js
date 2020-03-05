import React from 'react'
import Navbar from '../common/Navbar'

import HeroShowBackground from '../../assets/hero-show-background.jpg'

import axios from 'axios'

class HeroShow extends React.Component {
  
  state = {
    chosenHero: null
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`/api/heroes/${this.props.match.params.id}`)
      this.setState({ chosenHero: res.data })
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.chosenHero) return null
    const { chosenHero } = this.state
    return (
      <>
      <Navbar />
      <section className="section" style={{ backgroundImage: `url(${HeroShowBackground})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '95vh' }}>
        <div className="container">
          <div className="hero is-small shadow-box">
            <div className="hero-body has-text-centered">
              <h1 className="title is-1 has-text-centered light-text-title">{chosenHero.name} ({chosenHero.slug})</h1>
            </div>
          </div>
          <hr />
          <div className="columns is-mobile">
            <div className="column is-half">
              <figure className="image is-fullheight">
                <img src={chosenHero.image_url} style={{ maxHeight: '625px', borderRadius: '10px', boxShadow: '0px 0px 10px 5px black' }} alt="Look a picture" />
              </figure>
            </div>
            <div className="column is-half" >
              <div className="container shadow-box" style={{ maxHeight: '625px', overflowY: 'scroll', padding: '15px' }}>
                <h4 className="title is-4 light-text-title">Full Name</h4>
                <p className="light-text-title">{chosenHero.full_name}</p>
                <hr />
                <h4 className="title is-4 light-text-title">Gender</h4>
                <p className="light-text-title">{chosenHero.gender}</p>
                <hr />
                <h4 className="title is-4 light-text-title">Aliases</h4>
                <p className="light-text-title">{chosenHero.aliases.split('+').join(', ')}</p>
                <hr />
                <h4 className="title is-4 light-text-title">Alter Egos</h4>
                <p className="light-text-title">{chosenHero.alter_egos}</p>
                <hr />
                <h4 className="title is-4 light-text-title">Alignment</h4>
                <p className="light-text-title">{chosenHero.alignment}</p>
                <hr />
                <h4 className="title is-4 light-text-title">Occupation</h4>
                <p className="light-text-title">{chosenHero.occupation}</p>
                <hr />
                <h4 className="title is-4 light-text-title">Affiliations</h4>
                <p className="light-text-title">{chosenHero.affiliations}</p>
                <hr />
                <h4 className="title is-4 light-text-title">Publisher</h4>
                <p className="light-text-title">{chosenHero.publisher}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default HeroShow