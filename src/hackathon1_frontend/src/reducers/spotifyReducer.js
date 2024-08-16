const initialState = {
    data: null,
    error: null,
};

const spotifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_SPOTIFY_DATA_SUCCESS':
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case 'FETCH_SPOTIFY_DATA_FAILURE':
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export default spotifyReducer;
