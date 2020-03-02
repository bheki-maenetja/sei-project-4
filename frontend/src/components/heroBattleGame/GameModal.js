import React from 'react'

const GameModal = ({ winner, resetHandler }) => (
  <>
  <div className="modal-card">
    <div className="modal-card-head">
      <h1 className="modal-card-title is-1 has-text-centered">
        {winner === 'playerChoice' ? 'VICTORY!!!' : winner === 'compChoice' ? 'DEFEAT' : 'IT\'S A TIE'} 
      </h1>
    </div>
    <div className="modal-card-body">
      <figure className="image is-fullwidth">
        <img
          src={winner === 'playerChoice' ? 'https://thumbs.gfycat.com/ImpureThirdBillygoat-size_restricted.gif' : winner === 'compChoice' ? 'https://media.giphy.com/media/3xz2BLBOt13X9AgjEA/giphy.gif' : 'https://i.pinimg.com/originals/0b/66/57/0b6657dd6ce17b447e8277db4bed206e.gif'}
          alt="something" 
        />
      </figure>
      <hr />
      <h1 className="modal-card-title is-1 has-text-centered">
        {winner === 'playerChoice' ? 'Fantastic! You\'ve earned $20 and 50 xp' : winner === 'compChoice' ? '"Do or do not. There is no try."' : '"Perfectly balanced, as all things should be"'}
      </h1>
    </div>
    <div className="modal-card-foot">
      <button className="button modal-card-title is-danger" onClick={resetHandler}>End Game</button>
    </div>
  </div>
  </>
)

export default GameModal