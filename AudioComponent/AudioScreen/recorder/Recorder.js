import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
  Text,
  Alert,
  AsyncStorage,
  Dimensions
} from 'react-native'
import {
  AudioPlayer,
  AudioRecorder,
} from 'react-native-audio-player-recorder'
import { Actions } from 'react-native-router-flux'

import RecordButton from './RecordButton'
import ActionButtonOld from './ActionButtonOld'
import ActionButtons from './ActionButtons'
import ActionButtonsPlay from './ActionButtonPlay'
import Button from './Button'
import Constants from '../Constants'
import Colors from "../../../../constants/Colors";
import Strings from '../../../../constants/Strings';
import Icon2 from 'react-native-vector-icons/Ionicons'
import IconFont2 from 'react-native-vector-icons/Entypo';

import {
  audioRecordingRequest,
  loginNavigationStatus,
  audioRecordingFlag
} from "../../../../actions/ActionCreators";

import { clearAudioResponse, resetAudioResponse, audioRecordingPath } from '../../AudioRecorderAction'
import { connect } from "react-redux";
import CommonStyles from '../../../../commonStyle/CommonStyle';
import Modal from "react-native-modal";
import String from '../../../../constants/Strings'
import {
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace
} from "react-native-iphone-x-helper";
const window = Dimensions.get('window')

class Recorder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      isFinishRecorded: false,
      isPlaying: false,
      isPaused: false,
      currentTime: 0,
      audioLength: 0,
      audioPath: '',
      carownerLoginId: ''
    }
    this.timer = null
  }

  state = {
    visibleModal: null
  };

  componentWillMount() {
    console.log('===USERID===', this.props.userId)
    this.setState({ visibleModal: 1 })
    AsyncStorage.getItem("carOwnerUserId").then((value) => {
      if (value) {
        console.log('LoginId', value);
        this.setState({ carownerLoginId: value });
      }
    }).done();
  }

  componentWillReceiveProps(nextProps) {

    // console.log('audioRecordingFlagResponse ===== ', nextProps.audioRecordingFlagResponse)
    // if(nextProps.audioRecordingFlagResponse == 0){
      if (nextProps.audioRecordingResponse.data != '' && nextProps.audioRecordingResponse.data != undefined) {
        console.log("CWRP audioRecordingResponse: " + JSON.stringify(nextProps.audioRecordingResponse.data));
        if (nextProps.audioRecordingResponse.data.code == '200') {
          console.log("data **** : ", JSON.stringify(nextProps.audioRecordingResponse.data.message))
          this.setState({ isLoading: false })
          Alert.alert(
            "Mechanic.AI",
            nextProps.audioRecordingResponse.data.message,
            [
              { text: Strings.OK, onPress: () => this.onAlertConfirm() }
            ],
            { cancelable: true }
          )
        }
      }
    // }

  }

  prepareRecordingPath() {
    AudioRecorder.prepareRecordingAtPath(Constants.AUDIO_PATH, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    })
  }

  record = () => {
    const { isPlaying } = this.state
    if (isPlaying) {
      this.stopPlaying()
    }

    this.prepareRecordingPath()
    AudioRecorder.startRecording()
    this.setState({
      isPlaying: false,
      isRecording: true,
      isFinishRecorded: false,
      audioLength: 0,
      currentTime: 0
    })

    this.timer = setInterval(() => {
      const time = this.state.currentTime + 1
      this.setState({ audioLength: time })
      this.setState({ currentTime: time })
      console.log("Time : ", time);
      if (time === Constants.MAX_AUDIO_LENGTH) {
        this.stopRecording()
      }
    }, 1000)
  }

  stopRecording = () => {
    const { isRecording } = this.state
    if (!isRecording) return

    AudioRecorder.stopRecording()
    this.setState({ audioLength: this.state.currentTime + 1 })
    clearInterval(this.timer)
    this.setState({
      isRecording: false, isFinishRecorded: true, currentTime: 0,
      audioPath: 'file://' + Constants.AUDIO_PATH
    })
    console.log("Recorder path 0", 'file://' + Constants.AUDIO_PATH);
  }

  startPlaying = () => {
    if (this.state.isPaused) {
      AudioPlayer.unpause()
      this.setState({ isPlaying: true, isPaused: false })
      return
    }

    AudioPlayer.play(Constants.AUDIO_PATH)
    this.setState({ isPlaying: true })

    console.log("Recorder path 1 ", this.state.audioPath);
  }

  pausePlaying = () => {
    AudioPlayer.pause()
    this.setState({ isPaused: true, isPlaying: false })
  }

  stopPlaying() {
    AudioPlayer.stop()
    this.setState({ isPlaying: false })
  }


  playAudio1 = () => {
    this.stopRecording()
    this.stopPlaying()

    if (this.state.carownerLoginId) {

      if (this.state.audioPath == '') {

        Alert.alert(
          "",
          "please record to send your request",
          [
            { text: Strings.OK, onPress: () => null }
          ],
          { cancelable: true }
        )
      } else {
        this.setState({ isLoading: true })
        console.log('=== USERID ===', this.props.userId)
        console.log('Audio path >> ', this.state.audioPath)
        this.props.audioRecordingFlag('0')
        let path = this.state.audioPath;
        const formData = new FormData();
        formData.append('audiofile', {
          uri: path,
          name: 'test.aac',
          type: 'audio/aac',
        })
        formData.append('userId', this.props.userId);
        this.props.audioRecordingRequest(formData)
      }
    } else {
      Alert.alert(
        "",
        "Please login to send your request",
        [
          {
            text: Strings.OK, onPress: () => {
              this.props.audioRecordingPath(this.state.audioPath)
              this.props.loginNavigationStatus('recorder')
              Actions.LoginScreen()
            }
          }
        ],
        { cancelable: true }
      )
    }


  }

  onAlertConfirm() {
    this.props.resetAudioResponse()
    Actions.NewDashboardComponent({type:'reset'});
  }

  onSubmitAudio() {
    console.log("I am in audio request 222")
    Alert.alert(
      "Mechanic.AI",
      "Audio Request Submitted Sucessfully",
      [
        { text: Strings.OK, onPress: () => this.onAlertConfirm() }
      ],
      { cancelable: true }
    )

  }

  onBackClick() {
    this.props.resetAudioResponse()
    Actions.pop()
  }


  _renderInstructionModal = () => (
    <View style={CommonStyles.modalContentInstruction}>
      <View style={{ flex: 0.1 }}>
        {/* <ImageBackground style={CommonStyles.titleBarImageModalInstruction}
          source={require("../../../../assets/header.png")}> */}
        <View style={CommonStyles.titleBarImageModal}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginLeft: 20, color: Colors.DROP_DOWN, fontSize: 18, }}> Instruction </Text>
          </View>
          <TouchableOpacity
            style={CommonStyles.crossButtonStyle}
            onPress={() => this.setState({ visibleModal: null })}>
            <IconFont2
              name="cross"
              color={Colors.DROP_DOWN}
              size={20}
            />
          </TouchableOpacity>
        </View>
        {/* </ImageBackground> */}
      </View>

      <View style={{ flex: 0.9, marginTop: 20, }}>
        <Text style={{ textAlign: 'left', alignSelf: 'flex-start', margin: 10, fontSize: 16 }}>
          {String.Audio_String}
        </Text>
      </View>
    </View>
  );

  render() {

    const {
      isRecording,
      isFinishRecorded,
      isPlaying,
    } = this.state
    const playPauseIcon = isPlaying ? 'pause-circle-o' : 'play-circle-o'
    const playPauseHandler = isPlaying ? this.pausePlaying : this.startPlaying

    return (
      <ImageBackground style={{
        width: window.width,
        height: window.height,
        ...ifIphoneX({ paddingTop: getStatusBarHeight() }, { paddingTop: 0 })
      }}
        source={require("../../../../assets/bg.jpg")}>

        <View>
          <StatusBar backgroundColor="white" barStyle="light-content" />
        </View>

        <View style={{
          height: 70,
          paddingTop: 10,
          alignItems: 'center',
          flexDirection: "row",
          marginTop: 5,
          width: '100%',
          flex: 0.1

        }}>


          <TouchableOpacity
            style={{
              marginLeft: 10,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              flex: 0.1
            }}
            onPress={() => this.onBackClick()}>
            <Icon2
              name="ios-arrow-round-back"
              color="white"
              size={40}
            />

          </TouchableOpacity>

          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              color: Colors.WHITE,
              marginLeft: 50,
              fontSize: 18,
              flex: 0.6
            }}
          >
            Voice Recording
          </Text>

          <TouchableOpacity
            style={{
              marginLeft: 10,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginBottom: 5,
              paddingTop: 5,
              flex: 0.2
            }}
            onPress={() => this.setState({ visibleModal: 1 })}>
            <Icon2
              name="ios-help-circle-outline"
              color={Colors.WHITE}
              size={30}
            />

          </TouchableOpacity>

        </View>


        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

          <RecordButton
            isRecording={isRecording}
            isFinishRecorded={isFinishRecorded}
            onPressHandler={this.record}
          />

          <View style={{
            flex: 1, flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center', marginTop: 10, marginRight: -10
          }}>

            <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

              <Image style={{
                width: 17,
                height: 17,
                resizeMode: 'stretch',

              }}
                source={require("../../../../assets/time_3x.png")}>
              </Image>

              <Text
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  color: Colors.WHITE,
                  fontSize: 16,
                  marginLeft: 5,

                }}
              >
                {this.state.audioLength} Sec
                {/* 01:23:11 */}
              </Text>
            </View>


            <View>
            </View>

          </View>


          <View style={{ marginTop: 20 }}>

            <Image style={{
              width: 300,
              height: 70,
              resizeMode: 'stretch',

            }}
              source={require("../../../../assets/Wave.png")}>
            </Image>
          </View>


          <ActionButtons
            isFinishRecorded={isFinishRecorded}
            isRecording={isRecording}
            playPauseIcon={playPauseIcon}
            playPauseHandler={playPauseHandler}
            stopRecording={this.stopRecording}
          />


          <ActionButtonsPlay
            isFinishRecorded={isFinishRecorded}
            isRecording={isRecording}
            playPauseIcon={playPauseIcon}
            playPauseHandler={playPauseHandler}
            stopRecording={this.stopRecording}
          />

          <Button
            text='Submit'
            // isDisabled={!isFinishRecorded}
            onPressHandler={this.playAudio1} />

        </ScrollView>

        <Modal
          isVisible={this.state.visibleModal === 1}
          onBackdropPress={() => this.setState({ visibleModal: null })}
        >
          {this._renderInstructionModal()}
        </Modal>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: Constants.PLATFORM_MARGIN_TOP,
    flex: 0.9,
  },
  content: {
    alignItems: 'center'
  },
})


const mapStateToProps = ({ audioRecordingReducer }) => {
  const { audioRecordingResponse , audioRecordingFlagResponse} = audioRecordingReducer;

  return {
    audioRecordingResponse: audioRecordingResponse,
    audioRecordingFlagResponse: audioRecordingFlagResponse
  };
};

export default connect(mapStateToProps, {
  audioRecordingRequest,
  clearAudioResponse,
  resetAudioResponse,
  loginNavigationStatus,
  audioRecordingPath,
  audioRecordingFlag
})(Recorder);
