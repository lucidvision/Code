import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { AppNavbar, Button } from '~/components'
import { colors, fontSizes } from '~/styles'

const dismissKeyboard = require('dismissKeyboard')

export default function Play (props) {
  return (
    <TouchableWithoutFeedback onPress={() => { dismissKeyboard() }}>
      <View style={styles.container}>
        <AppNavbar
          title='Play Game'
          leftButton={<Button text={'Close'} onPress={props.onBack}/>} />
        <KeyboardAvoidingView behavior={'padding'} style={styles.gameContainer}>
          <View style={styles.codeContainer}>
            <Text style={styles.promptText}>{`${props.game.host.displayName}'s Code`}</Text>
            <Text style={styles.codeText}>{props.game.code}</Text>
          </View>
          {props.playerGuess.length > 0
            ? <View style={styles.guessContainer}>
                <Text style={styles.promptText}>Your Guess</Text>
                <Text style={styles.codeText}>{props.playerGuess}</Text>
              </View>
            : <View style={styles.guessContainer}>
                <Text style={styles.promptText}>Your Guess</Text>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  style={styles.guessInput}
                  onChangeText={(text) => props.changeGuess(text)}
                  value={props.guess} />
              </View>}
          <TouchableOpacity
            style={props.guess.length > 0 ? styles.submitButton : styles.disabledButton}
            disabled={!props.guess.length > 0}
            onPress={props.onSubmitButtonPressed}>
            <Text style={styles.submitButtonText}>Submit Guess</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

Play.propTypes = {
  guess: PropTypes.string.isRequired,
  playerGuess: PropTypes.string.isRequired,
  game: PropTypes.object.isRequired,
  onSubmitButtonPressed: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  codeContainer: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 10
  },
  promptText: {
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.primary
  },
  codeText: {
    color: colors.blue,
    padding: 10,
    fontSize: fontSizes.secondary
  },
  guessContainer: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 10
  },
  guessInput: {
    height: 40,
    borderColor: colors.blue,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    fontSize: fontSizes.secondary
  },
  submitButton: {
    backgroundColor: colors.blue,
    width: 200,
    height: 100,
    borderRadius: 25,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledButton: {
    width: 200,
    height: 120
  },
  submitButtonText: {
    color: colors.white,
    fontSize: fontSizes.primary
  }
})
