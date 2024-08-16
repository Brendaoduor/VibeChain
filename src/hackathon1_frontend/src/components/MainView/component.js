import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyData } from "../../actions/spotifyActions";
import PropTypes from "prop-types";
import SongList from "../SongList";
import AlbumList from "../AlbumList";
import ArtistList from "../ArtistList";
import BrowseView from "../BrowseView";
import "./MainView.css";


const MainView = ({ headerTitle, audioControl, resumeSong, pauseSong }) => {
  const dispatch = useDispatch();

  // Fetch Spotify data when the component mounts
  useEffect(() => {
    dispatch(fetchSpotifyData());
  }, [dispatch]);

  // Get the fetched data from Redux store
  const spotifyData = useSelector((state) => state.spotify.data);
  const spotifyError = useSelector((state) => state.spotify.error);

  return (
    <React.Fragment>
      {headerTitle === "Albums" ? (
        <AlbumList audioControl={audioControl} />
      ) : headerTitle === "Artists" ? (
        <ArtistList />
      ) : headerTitle === "Browse" ? (
        <BrowseView />
      ) : (
        //anything else show SongList
        <SongList
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      )}

      {/* Display fetched Spotify data or error if needed */}
      {spotifyData && (
        <div className="spotify-data">
          <h2>Spotify Data:</h2>
          <pre>{JSON.stringify(spotifyData, null, 2)}</pre>
        </div>
      )}
      {spotifyError && <div className="error">Error: {spotifyError}</div>}

    </React.Fragment>
  );
};

MainView.propTypes = {
  headerTitle: PropTypes.string,
  audioControl: PropTypes.func,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func
};

export default MainView;
