import React from 'react'

const HeroSearchForm = ({ heroData, handleChange, name, choiceObject, getRandomHero }) => (
  <>
  <form>
    <div className="field">
      <div className="level">
        <div className="level-left">
          <div className="control">
            <label className="label light-text-body">Choose a hero</label>
            <select className="select" name={name} value={choiceObject.id} onChange={handleChange}>
              {heroData.map(item => {
                return (
                  <option key={item.id} value={item.id}>{item.name}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="level-right">
          <div className="control">
            <button className="button is-warning" name={name} onClick={getRandomHero}>Random</button>
          </div>
        </div>
      </div>
    </div>
  </form>
  </>
)

export default HeroSearchForm