import ACTION_TYPES from '../../actions/ActionsType';
import API from '../../constants/APIUrls';

export const clearAudioResponse = () => ({
  type: ACTION_TYPES.CLEAR_AUDIO_RESPONSE
});

export const resetAudioResponse = () => ({
    type: ACTION_TYPES.RESET_AUDIO_RESPONSE
  });

  export function audioRecordingPath (data) {
    return {
      type: ACTION_TYPES.AUDIO_RECORDING_PATH,
      payload:data
    }
  };

  export const audioRecordingPathClear = () => ({
    type: ACTION_TYPES.AUDIO_RECORDING_PATH_CLEAR
  });