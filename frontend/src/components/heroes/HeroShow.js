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
          <h1 className="title is-1">{chosenHero.name} ({chosenHero.slug})</h1>
          <hr />
          <div className="columns is-mobile">
            <div className="column is-half">
              <figure className="image is-fullheight">
                <img src={chosenHero.image_url} style={{ maxHeight: '625px' }} alt="Look a picture" />
              </figure>
            </div>
            <div className="column is-half" >
              <div className="container" style={{ maxHeight: '625px', overflowY: 'scroll', border: '2px solid black', padding: '15px' }}>
                <h4 className="title is-4">Full Name</h4>
                <p>{chosenHero.full_name}</p>
                <hr />
                <h4 className="title is-4">Gender</h4>
                <p>{chosenHero.gender}</p>
                <hr />
                <h4 className="title is-4">Aliases</h4>
                <p>{chosenHero.aliases.split('+').join(', ')}</p>
                <hr />
                <h4 className="title is-4">Alter Egos</h4>
                <p>{chosenHero.alter_egos}</p>
                <hr />
                <h4 className="title is-4">Alignment</h4>
                <p>{chosenHero.alignment}</p>
                <hr />
                <h4 className="title is-4">Occupation</h4>
                <p>{chosenHero.occupation}</p>
                <hr />
                <h4 className="title is-4">Affiliations</h4>
                <p>{chosenHero.affiliations}</p>
                <hr />
                <h4 className="title is-4">Publisher</h4>
                <p>{chosenHero.publisher}</p>
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