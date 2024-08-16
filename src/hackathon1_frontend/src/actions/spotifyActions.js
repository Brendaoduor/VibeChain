import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../declarations/hackathon1_backend'; // Adjust the import path if necessary

const agent = new HttpAgent();
const canisterId = 'b77ix-eeaaa-aaaaa-qaada-cai'; // Replace with your actual canister ID
const backendActor = Actor.createActor(idlFactory, { agent, canisterId });

export const fetchSpotifyData = () => {
    return async (dispatch) => {
        try {
            const data = await backendActor.fetch_data_from_spotify();
            dispatch({ type: 'FETCH_SPOTIFY_DATA_SUCCESS', payload: data });
        } catch (error) {
            console.error("Error:", error);
            dispatch({ type: 'FETCH_SPOTIFY_DATA_FAILURE', error });
        }
    };
};
