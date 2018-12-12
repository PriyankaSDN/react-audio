import React  from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'

import Constants from '../Constants'
const window = Dimensions.get("window");

export default function Button(props) {
  const { text, isDisabled, onPressHandler } = props
  const bgColor = isDisabled ? Constants.ICON_GREY_COLOR : Constants.CUSTOM_RED
  
  if (isDisabled) {
    return (
      <View style={styles.actionBtn}>
        <Text style={[styles.text]}>{text}</Text>
      </View>
    )
  }
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPressHandler}>
      <Text style={[styles.text]}>{text}</Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onPressHandler: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth:1,
    borderColor: "#FFFFFF",

  },
  text: {
    width: (window.width / 2),
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
   
   
  }
})
