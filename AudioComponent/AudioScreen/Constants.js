import { Platform } from 'react-native'
import { AudioUtils } from 'react-native-audio-player-recorder'

const Constants = {
  MAX_AUDIO_LENGTH: 120,
  AUDIO_PATH: AudioUtils.DocumentDirectoryPath + '/example.aac',
  CUSTOM_RED: '#f22335',
  PLATFORM_MARGIN_TOP: Platform.OS === 'ios' ? 44 : 34,
  ICON_GREY_COLOR: '#6b6b6b',
  WHITE : '#FFFFFF',
  ICON_WHITE : '#FFFFFF',
  APP_COLOR: "#cb4b48"
}

export default Constants
