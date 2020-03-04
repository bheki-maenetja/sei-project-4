import React from 'react'

class UserCardIndex extends React.Component {
  
  render() {
    const { cardData, clickHandler } = this.props
    return (
      <>
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {cardData.map(card => {
              return (
                <div className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile" key={card.id}>
                  <div className="card" onClick={() => clickHandler(card.id)}>
                    <div className="card-image">
                      <figure className="card-image">
                        <img src={card.image} alt={card.name} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h1 className="title is-5 has-text-centered light-text-title">{card.name}</h1>
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
  }
} 

export default UserCardIndex