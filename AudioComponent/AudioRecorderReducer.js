import ACTION_TYPES from "../../actions/ActionsType";

const INITIAL_STATE = {
    audioRecordingResponse: '',
    audioRecordingFlagResponse: ''
    
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPES.AUDIO_RECORDING_RESPONSE:
            console.log("reducer response audio recording : ", JSON.stringify(action.payload))
            return { ...state, audioRecordingResponse: action.payload };

            case ACTION_TYPES.CLEAR_AUDIO_RESPONSE:
            return { ...state, audioRecordingResponse: ''};

            case ACTION_TYPES.RESET_AUDIO_RESPONSE:
            return INITIAL_STATE;

            case ACTION_TYPES.AUDIO_RECORDING_PATH_FLAG:
            return {...state, audioRecordingFlagResponse: action.payload}

        default:
            return state;
    }
};
