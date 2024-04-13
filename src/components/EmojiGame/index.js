/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'

import './index.css'
import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'

class EmojiGame extends Component {
  state = {
    clickedEmojiList = [],
    isGameInProgress: true,
    topScore: 0,
  }

  resetGame = () => {
    this.setState({clickedEmojiList: [], isGameInProgress: true})
  }

  renderScoredCard = () => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.props
    const isWon = clickedEmojiList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickedEmojiList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (currentScore > topScore) {
      newTopScore = currentScore
    }
    this.setState({topScore: newTopScore, isGameInProgress: false})
  }
  clickEmoji = id => {
    const {emojisList} = this.state
    const {clickedEmojiList} = this.state
    const isEmojiPresent = clickedEmojiList.includes(id)
    const clickedEmojiLength = clickedEmojiList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojiLength)
    } else {
      if (emojisList.length - 1 === clickedEmojiLength) {
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(previousState => ({
        clickedEmojiList: [...previousState.clickedEmojiList, id],
      }))
    }
  }

  getShuffledEmojiList = () => {
    const {emojisList} = this.state
    return emojisList.sort(() => Math.random() - 0.5)
  }
  renderEmojiList = () => {
    const shuffledEmojisList = this.shuffledEmojisList()

    return (
      <ul className="emoji-list">
        {shuffledEmojisList.map(emojiObject => (
          <EmojiCard
            key={emojiObject.id}
            emojiDetails={emojiObject}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }
  render() {
    const {clickedEmojiList, isGameInProgress, topScore} = this.state

    return (
      <div className="app-container">
        <NavBar
          currentScore={clickedEmojiList.length}
          isGameInProgress={isGameInProgress}
          topScore={topScore}
        />
        <div>
          {isGameInProgress ? this.renderEmojiList() : this.renderScoredCard()}
        </div>
      </div>
    )
  }
}
export default EmojiGame
