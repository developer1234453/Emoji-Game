// Write your code here.
import './index.css'
const WON_IMAGE = 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
const LOSE_IMAGE = 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'

const WinOrLoseCard = props => {
  const {isWon, onClickPlayAgain, score} = props
  const imageUrl = isWon ? WON_IMAGE : LOSE_IMAGE
  const gamesStatus = isWon ? 'You Won' : 'You Lose'
  const scoreLabel = isWon ? 'Best Score' : 'Score'
  return (
    <div className="win-los-card">
      <div>
        <h1>{gamesStatus}</h1>
        <p>{scoreLabel}</p>
        <p>{score}/12</p>
        <button type="button" onClick={onClickPlayAgain}>
          Play Again
        </button>
      </div>
      <div>
        <img src={imageUrl} alt="win or lose" />
      </div>
    </div>
  )
}
export default WinOrLoseCard
