import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Constants from '../Constants'

export default function IconButton(props) {
  const { isDisabled, onPressHandler, iconName } = props
  const iconColor = isDisabled ? Constants.ICON_GREY_COLOR : Constants.CUSTOM_RED

  if (isDisabled) {
    return (
      <View style={styles.actionBtn}>  
          <Icon name={iconName} size={20} color='#FFFFFF' />
      </View>
    )
  }
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPressHandler} isDisabled>
     
        <Icon name={iconName} size={20} color='red' />
      
    </TouchableOpacity>
  )
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onPressHandler: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  actionBtn: {
    flex: 0.5,
    alignItems: 'center',
  },
})
