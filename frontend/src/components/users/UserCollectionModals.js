import React from 'react'

const UserCollectionModal = ({ currentColl, clearModal }) => (
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
    </div>
    <div className="modal-card-foot">
      <button className="button modal-card-title is-warning">Sell</button>
      <button className="button modal-card-title is-danger">Delete</button>
    </div>
  </div>
  </>
)

export default UserCollectionModal