import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

import HeroBattleImage from '../../assets/hero-battle-carousel.jpeg'
import HeroExploreImage from '../../assets/hero-directory-carousel.jpg'
import MarketPlaceImage from '../../assets/marketplace-carousel.jpg'
import WelcomeImage from '../../assets/welcome-carousel.jpg'
import HeaderImage from '../../assets/title-page-background.jpg'

class Home extends React.Component {
  
  state = {}
  
  render() {
    if (!Carousel) return null
    return (
      <>
      <div className="hero is-info" style={{backgroundImage: `url(${HeaderImage})`, backgroundPosition: '50% 20%', backgroundSize: 'cover'}}>
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1 has-text-centered">POW!!!</h1>
          </div>
        </div>
      </div>
      <Navbar />
      <Carousel 
        showThumbs={false} 
        showStatus={false} 
        infiniteLoop={true} 
        autoPlay={true} 
        stopOnHover={false}
        swipeable={false}
        interval={5000}
      >
        <div>
          <div className="hero is-large" style={{backgroundImage: `url(${WelcomeImage})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '79vh'}}>
            <div className="hero-body">
              <div className="legend" style={{ backgroundColor: 'rgba(0,0,0, 0.5)', opacity: '1' }}>
                <h1 className="title is-1 has-text-white">Welcome to POW!!! Your #1 Place for All Things Superheroes!!!</h1>
              </div>
            </div>
          </div>
        </div>
				<div>
          <div className="hero is-large" style={{backgroundImage: `url(${MarketPlaceImage})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '79vh'}}>
            <div className="hero-body">
              <Link to="/marketplace">
                <div className="legend" style={{ backgroundColor: 'rgba(0,0,0, 0.5)', opacity: '1' }}>
                  <h1 className="title is-2 has-text-white">Explore Over 8000 Cards &amp; and Collections at the Online Market Place</h1>
                </div>
              </Link>
            </div>
          </div>
				</div>
				<div>
          <div className="hero is-large" style={{backgroundImage: `url(${HeroBattleImage})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '79vh'}}>
            <div className="hero-body">
              <Link to="/hero-battle">
                <div className="legend" style={{ backgroundColor: 'rgba(0,0,0, 0.5)', opacity: '1' }}>
                  <h1 className="title is-2 has-text-white">Put your cards to the test in HERO BATTLE, the ultimate contest of champions!</h1>
                </div>
              </Link>
            </div>
          </div>
				</div>
				<div>
          <div className="hero is-large" style={{backgroundImage: `url(${HeroExploreImage})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '79vh'}}>
            <div className="hero-body">
              <Link to="/heroes">
                <div className="legend" style={{ backgroundColor: 'rgba(0,0,0, 0.5)', opacity: '1' }}>
                  <h1 className="title is-2 has-text-white">Get to know your favourite superheroes even better at the hero directory</h1>
                </div>
              </Link>
            </div>
          </div>
				</div>
      </Carousel>
      </>
    )
  }
}

export default Home