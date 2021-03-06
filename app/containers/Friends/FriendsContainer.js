import React, { PropTypes, Component } from 'react'
import { ListView, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Friends, Friend } from '~/components'
import { fetchAndSetFriendsListener, endFriendship } from '~/redux/modules/friends'
import { showFlashNotification } from '~/redux/modules/flashNotification'

class FriendsContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    friends: PropTypes.array.isRequired,
    listenerSet: PropTypes.bool.isRequired,
    openDrawer: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(props.friends)
    }
  }
  componentDidMount () {
    if (this.props.listenerSet === false) {
      this.props.dispatch(fetchAndSetFriendsListener())
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.friends !== this.props.friends) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.friends)
      })
    }
  }
  handleToAddFriend = () => {
    this.props.navigator.push({addFriends: true})
  }
  handleRemovePressed = (fuid) => {
    Alert.alert(
      'Remove Friend',
      'Are you sure you want to remove this friend?',
      [
        {text: 'Yes', onPress: () => this.props.dispatch(endFriendship(fuid))
          .then(() => this.props.dispatch(showFlashNotification({text: 'Friend removed!'})))
          .catch(() => this.props.dispatch(showFlashNotification({text: 'Error sending game!'})))},
        {text: 'Cancel', onPress: () => {}, style: 'cancel'}
      ]
    )
  }
  renderRow = ({displayName, uid}) => {
    return (
      <Friend
        fuid={uid}
        name={displayName}
        onRemovePressed={this.handleRemovePressed} />
    )
  }
  render () {
    return (
      <Friends
        handleToAddFriend={this.handleToAddFriend}
        openDrawer={this.props.openDrawer}
        friends={this.props.friends}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        listenerSet={this.props.listenerSet} />
    )
  }
}

function mapStateToProps ({friends}) {
  return {
    friends: friends.friends,
    listenerSet: friends.listenerSet
  }
}

export default connect(mapStateToProps)(FriendsContainer)
