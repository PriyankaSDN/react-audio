import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native'

import Colors from '../../../../constants/Colors'
import Constants from '../Constants'
import IconButton from './IconButton'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function TouchableClickPlay(props) {

    const { isDisabled, onPressHandler, iconName } = props
    const iconColor = isDisabled ? Constants.ICON_GREY_COLOR : Constants.CUSTOM_RED

    if (isDisabled) {
        return (
            <View style={styles.actionBtn}>

                <TouchableOpacity style={styles.touchableStyle} >
                    {/* <Icon name="playPauseIcon" color="white"  size={15} /> */}
                    {/* <IconButton
                        iconName={playPauseIcon}
                        isDisabled={!isFinishRecorded || isRecording}
                        onPressHandler={playPauseHandler}
                    /> */}

                      <Icon name={iconName} size={20} color='#FFFFFF' />

                    <Text style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: '#FFFFFF',
                        fontSize: 16,
                        marginLeft: 10,
                    }}>
                    Play Recording    
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
    return (
        <TouchableOpacity style={styles.touchableStyleActive} onPress={onPressHandler}>

            <Icon name={iconName} size={20} color='white' />
            <Text style={{
                textAlign: 'center',
                alignSelf: 'center',
                color: 'white',
                fontSize: 16,
                marginLeft: 10,
            }}>
            Play Recording
            </Text>
        </TouchableOpacity>
    )
}

TouchableClickPlay.propTypes = {

    iconName: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPressHandler: PropTypes.func.isRequired,
}


const styles = StyleSheet.create({
    actionBtn: {
        flex: 0.5,
        alignItems: 'center',
    },

    touchableStyle: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#FFFFFF",
        flexDirection: 'row',
        marginTop: 20,
        width: 200,
        borderRadius: 30,
    },
    touchableStyleActive: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.WHITE,
        backgroundColor:'#8d3332',
        flexDirection: 'row',
        marginTop: 20,
        width: 200,
        borderRadius: 30,
    }
})
