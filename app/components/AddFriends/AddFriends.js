import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, ListView, ActivityIndicator } from 'react-native'
import { AppNavbar, Button } from '~/components'
import { colors, fontSizes } from '~/styles'

const dismissKeyboard = require('dismissKeyboard')

export default function AddFriends (props) {
  function onUpdateSearchText (text) {
    props.updateSearchText(text)
    props.findFriend(text)
  }
  return (
    <TouchableWithoutFeedback onPress={() => { dismissKeyboard() }}>
      <View style={styles.container}>
        <AppNavbar
          title='Add Friends'
          leftButton={<Button text={'Close'} onPress={props.onBack}/>} />
        <View style={styles.searchContainer}>
          <Text style={styles.searchHeader}>Search for Friends</Text>
          <TextInput
            style={styles.searchInput}
            maxLength={30}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType='email-address'
            onChangeText={(text) => onUpdateSearchText(text)}
            value={props.searchText}
            placeholder='Search by email' />
          {props.searchText.length > 0
            ? <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{props.resultText}</Text>
                {props.showResult
                  ? <TouchableOpacity
                      style={styles.addButton}
                      onPress={props.onAddPressed}>
                      <Text style={styles.addButtonText}>Add+</Text>
                    </TouchableOpacity>
                  : null}
              </View>
            : null}
        </View>
        <View style={styles.listContainer}>
          {props.listenerSet === false
            ? <ActivityIndicator
                size='small'
                style={styles.activityIndicator}
                color={colors.secondary} />
            : props.requests.length > 0
              ? <ListView
                  renderHeader={props.renderHeader}
                  renderRow={props.renderRow}
                  dataSource={props.dataSource} />
              : <Text style={styles.noRequestsText}>No Friend Requests</Text>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

AddFriends.propTypes = {
  onBack: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  requests: PropTypes.array.isRequired,
  resultText: PropTypes.string.isRequired,
  showResult: PropTypes.bool.isRequired,
  findFriend: PropTypes.func.isRequired,
  onAddPressed: PropTypes.func.isRequired,
  dataSource: PropTypes.object.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired,
  listenerSet: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  searchContainer: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 10
  },
  searchHeader: {
    color: colors.primary,
    fontSize: fontSizes.primary,
    padding: 10
  },
  searchInput: {
    height: 40,
    borderColor: colors.blue,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  resultText: {
    flex: 1,
    marginLeft: 10,
    color: colors.blue,
    fontSize: fontSizes.secondary
  },
  addButton: {
    backgroundColor: colors.blue,
    borderRadius: 25,
    padding: 10,
    marginRight: 10
  },
  addButtonText: {
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'center'
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 50
  },
  activityIndicator: {
    marginTop: 30
  },
  noRequestsText: {
    padding: 10,
    fontSize: fontSizes.primary,
    color: colors.blue,
    marginTop: 100,
    textAlign: 'center'
  }
})
