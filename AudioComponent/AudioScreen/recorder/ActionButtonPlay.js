import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    Button
} from 'react-native'

import IconButton from './IconButton'
import TouchableOpacityPlay from './TouchableClickPlay'


export default function ActionButtonPlay(props) {
    const {
        isFinishRecorded,
        isRecording,
        playPauseIcon,
        playPauseHandler,
        stopRecording
    } = props
    return (
        <View style={styles.buttonGroup}>

            <TouchableOpacityPlay
                iconName={playPauseIcon}
                isDisabled={!isFinishRecorded || isRecording}
                onPressHandler={playPauseHandler}>
            </TouchableOpacityPlay>

           
        </View>
    )
}

ActionButtonPlay.propTypes = {
    isFinishRecorded: PropTypes.bool.isRequired,
    isRecording: PropTypes.bool.isRequired,
    playPauseIcon: PropTypes.string.isRequired,
    playPauseHandler: PropTypes.func.isRequired,
    stopRecording: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    buttonGroup: {
        flex: 1,
        flexDirection: 'column',
    },
})
