from kybra import (
    Actor,
    blob,
    init,
    query,
    update,
    stable,
    Principal,
)

import requests # For handling HTTP requests

# Define your data models
class User(stable):
    id: Principal
    username: str
    playlists: list[str]

class Playlist(stable):
    id: str
    name: str
    owner: Principal
    songs: list[str]
    followers: list[Principal]

class Song(stable):
    id: str
    title: str
    artist: str
    uri: str

# Database
users: dict[Principal, User] = {}
playlists: dict[str, Playlist] = {}
songs: dict[str, Song] = {}

# Initialize the canister
@init
def init() -> None:
    pass

# User registration
@update
def register_user(username: str) -> None:
    caller = Actor.caller()
    if caller not in users:
        users[caller] = User(
            id=caller,
            username=username,
            playlists=[]
        )

# Create a playlist
@update
def create_playlist(name: str) -> str:
    caller = Actor.caller()
    playlist_id = f"{caller}-{name}"
    playlists[playlist_id] = Playlist(
        id=playlist_id,
        name=name,
        owner=caller,
        songs=[],
        followers=[]
    )
    users[caller].playlists.append(playlist_id)
    return playlist_id

# Add a song to a playlist
@update
def add_song_to_playlist(playlist_id: str, song_id: str) -> None:
    if playlist_id in playlists:
        playlists[playlist_id].songs.append(song_id)

# Follow a playlist
@update
def follow_playlist(playlist_id: str) -> None:
    caller = Actor.caller()
    if playlist_id in playlists:
        playlists[playlist_id].followers.append(caller)

# Get user's playlists
@query
def get_user_playlists() -> list[Playlist]:
    caller = Actor.caller()
    return [playlists[pid] for pid in users[caller].playlists]

# NFT Interaction - Example of minting an NFT for a song
@update
def mint_nft_for_song(song_id: str, metadata: blob) -> str:
    # Assuming some NFT minting logic
    nft_id = f"{song_id}-nft"
    # Logic to mint NFT and associate it with the song_id
    return nft_id

# Fetch song details
@query
def get_song(song_id: str) -> Song:
    return songs[song_id]


# New Class: Hackathon1Backend for Spotify API Interaction
@Actor
class Hackathon1Backend:
    @query
    def fetch_data_directly(self) -> str:
        # This function will return a static message
        return "Direct integration with an external API would go here."

    @update
    def fetch_data_from_spotify(self) -> str:
        # This function will make an HTTP request to the Spotify API
        headers = {
            'Authorization': 'Bearer'  # Replace with your actual Spotify API token
        }
        response = requests.get('https://api.spotify.com/v1/me', headers=headers)

        if response.status_code == 200:
            return response.text
        else:
            return f"Error fetching data: {response.status_code}"
