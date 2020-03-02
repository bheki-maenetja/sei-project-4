import React from 'react'
import { Link } from 'react-router-dom'

const MarketCardModal = ({ currentCard, clearModal, buyHandler }) => (
  <>
  <div className="modal-card">
    <div className="modal-card-head">
      <h1 className="modal-card-title is-1">{currentCard.name}</h1>
      <button className="delete" aria-label="close" onClick={() => clearModal()}></button>
    </div>
    <div className="modal-card-body">
      <figure className="image is-fullwidth" style={{ 
          backgroundImage: `url(${currentCard.image})`,
          backgroundSize: 'cover',
          height: '400px'
        }}></figure>
      <hr />
      <h1 className="modal-card-title is-1">Power Stats</h1>
      <hr />
      <div className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading"><strong>Intelligence</strong></p>
            <p className="title">{currentCard.intelligence}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading"><strong>Strength</strong></p>
            <p className="title">{currentCard.strength}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading"><strong>Power</strong></p>
            <p className="title">{currentCard.power}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading"><strong>Durability</strong></p>
            <p className="title">{currentCard.durability}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading"><strong>Speed</strong></p>
            <p className="title">{currentCard.speed}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading"><strong>Combat</strong></p>
            <p className="title">{currentCard.combat}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading"><strong>Overall</strong></p>
            <p className="title">{currentCard.overall}</p>
          </div>
        </div>
      </div>
      <p><strong>Level {currentCard.level.power_level} ({currentCard.level.name})</strong></p>
      <p><strong>Market Value:</strong> <span>${currentCard.price} ({currentCard.price_bracket.name})</span></p>
    </div>
    <div className="modal-card-foot">
      <button className="button modal-card-title is-info" onClick={() => buyHandler(currentCard.id)}>Buy</button>
      <Link to={`/heroes/${currentCard.hero.id}`}><button className="button modal-card-title is-primary">More Info</button></Link>
    </div>
  </div>
  </>
)

export default MarketCardModal