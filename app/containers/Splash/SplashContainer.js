import React, { PropTypes, Component } from 'react'
import { Splash } from '~/components'
import { connect } from 'react-redux'
import { handleAuthWithFirebase } from '~/redux/modules/authentication'

class SplashContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  handleLoginFinished = (error, result) => {
    if (error) {
      console.warn('Error in handleLoginFinished: ', error)
    } else if (result.isCancelled === true) {
      console.log('Auth Cancelled')
    } else {
      this.props.dispatch(handleAuthWithFirebase())
    }
  }
  render () {
    return (
      <Splash onLoginFinished={this.handleLoginFinished} />
    )
  }
}

export default connect()(SplashContainer)
