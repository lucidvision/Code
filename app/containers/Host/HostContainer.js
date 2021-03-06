import React, { PropTypes, Component } from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import { Host, Guess } from '~/components'
import Header from '~/components/Guesses/Header'
import { releaseScoreAndCompleteGame, completeGamePlaying } from '~/redux/modules/games'
import { showFlashNotification } from '~/redux/modules/flashNotification'

class HostContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    authedId: PropTypes.string.isRequired,
    game: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired
  }
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(props.players)
    }
  }
  renderHeader = () => {
    return <Header text={'Guesses'}/>
  }
  renderRow = (player) => {
    return (
      <Guess player={player} />
    )
  }
  handleScorePressed = () => {
    this.props.dispatch(releaseScoreAndCompleteGame(this.props.game))
      .then(() => { this.props.dispatch(showFlashNotification({text: 'Sent results!'})) })
      .catch(() => { this.props.dispatch(showFlashNotification({text: 'Error sending results!'})) })
    this.props.navigator.pop()
  }
  handleOnBack = () => {
    if (this.props.authedId === this.props.game.host.uid) {
      this.props.navigator.pop()
    } else {
      this.props.dispatch(completeGamePlaying(this.props.game))
        .then(() => { this.props.dispatch(showFlashNotification({text: 'Game completed!'})) })
        .catch(() => { this.props.dispatch(showFlashNotification({text: 'Error completing game!'})) })
      this.props.navigator.pop()
    }
  }
  render () {
    return (
      <Host
        authedId={this.props.authedId}
        game={this.props.game}
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader}
        renderRow={this.renderRow}
        onScorePressed={this.handleScorePressed}
        onBack={this.handleOnBack} />
    )
  }
}

function mapStateToProps ({authentication, games}) {
  return {
    authedId: authentication.authedId,
    game: games.game,
    players: games.players
  }
}

export default connect(mapStateToProps)(HostContainer)
