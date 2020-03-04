import React from 'react'

const MarketCollectionIndex = ({ collectionData, clickHandler }) => (
  <>
  <section className="section">
    <div className="container">
      <div className="columns is-mobile is-multiline">
        {collectionData.map(collection => {
          return (
            <div className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile" key={collection.id}>
              <div className="card" onClick={() => clickHandler(collection.id)}>
                <div className="card-image">
                  <figure className="card-image">
                    <img src={collection.image} alt={collection.name} />
                  </figure>
                </div>
                <div className="card-content">
                  <h1 className="title is-5 has-text-centered light-text-title">{collection.name}</h1>
                </div>
              </div>
            </div>                
          )
        })}
      </div>
    </div>
  </section>
  </>
)

export default MarketCollectionIndex