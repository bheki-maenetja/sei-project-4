import React from 'react'

const UserCollectionModal = ({ currentColl, clearModal, sellHandler }) => (
  <>
  <div className="modal-card">
    <div className="modal-card-head">
      <h1 className="modal-card-title is-1">{currentColl.name}</h1>
      <button className="delete" aria-label="close" onClick={() => clearModal()}></button>
    </div>
    <div className="modal-card-body">
      <figure className="image is-fullwidth" style ={{
        backgroundImage: `url(${currentColl.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px'
      }}></figure>
      <hr />
      <p><strong>Average Overall:</strong> <span>{currentColl.avg_overall}</span></p>
      <p><strong>Level {currentColl.avg_level.power_level} ({currentColl.avg_level.name})</strong></p>
      <p><strong>Market Value: ${currentColl.value} ({currentColl.price_bracket.name})</strong></p>
      <hr />
      <h2 className="title has-text-centered is-4">Cards</h2>
      <hr />
      <div className="columns is-mobile is-multiline">
        {currentColl.cards.map(card => {
          return (
            <div className="column is-one-third" key={card.id}>
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <img src={card.image} alt={card.name} />
                  </figure>
                </div>
                <div className="card-content">
                  <p className="title has-text-centered is-5"><strong>{card.name}</strong></p>
                  <p className="subtitle has-text-centered is-6">{card.level.name}</p>
                  <p className="subtitle has-text-centered is-6">{card.price_bracket.name}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    <div className="modal-card-foot">
      <button className="button modal-card-title is-warning" onClick={() => sellHandler(currentColl.id)}>Sell</button>
      <button className="button modal-card-title is-danger">Delete</button>
    </div>
  </div>
  </>
)

export default UserCollectionModal