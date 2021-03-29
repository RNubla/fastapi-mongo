import { createStore } from "vuex";
const axios = require("axios");
export default createStore({
  state: {
    audio: null,
    isPlaying: false,
    songs: [],
    currentSongIndex: 0,
    currentSong: {
      title: null,
      artist: null,
      audio_src: null,
      id: null,
    },
  },
  mutations: {
    SET_SONGS(state, songs) {
      state.audio = new Audio();
      state.songs = songs;
      // console.log("SET_SONG", state.songs);
    },
    ADD_SONG(state, payload) {
      state.songs.push(payload);
      console.log("ADD_SONG", state.songs);
    },
    RESET_TRACK(state) {
      state.currentSongIndex = 0;
      state.audio.src = state.currentSong.audio_src;
      state.isPlaying = false;
    },
    ON_LOAD_SONGS(state) {
      state.currentSong.title = state.songs[state.currentSongIndex].music_name;
      state.currentSong.artist =
        state.songs[state.currentSongIndex].music_artist;
      state.currentSong.audio_src =
        state.songs[state.currentSongIndex].audio_url;
      state.audio.src = state.songs[state.currentSongIndex].audio_url;
    },
    NEXT_SONG(state) {
      // Title
      state.currentSong.title = state.songs[state.currentSongIndex].music_name;
      // Artist
      state.currentSong.artist =
        state.songs[state.currentSongIndex].music_artist;

      state.currentSong.audio_src =
        state.songs[state.currentSongIndex].audio_url;

      state.currentSong.id = state.songs[state.currentSongIndex].id;
      state.audio.src = state.currentSong.audio_src;
      console.log("nextSongMutation", state.currentSong);
    },
  },
  getters: {
    getLengthOfCurrentSong: (state) => {
      return state.currentSong.length;
    },
    getListOfSongs: (state) => {
      return state.songs;
    },

    getUpdatedSongs: (state) => {
      return state.songs;
    },
    songsCount: (state) => {
      return state.songs.length;
    },
    getCurrentSongTitle: (state) => {
      return state.currentSong.title;
    },
    getCurrentSongArtist: (state) => {
      return state.currentSong.artist;
    },
    getCurrentSongAudio: (state) => {
      return state.currentSong.audio_src;
    },
    getCurrentSongOriginalURL: (state) => {
      return state.songs.original_url;
    },
    getCurrentSongID: (state) => {
      return state.songs.id;
    },
  },
  actions: {
    async fetchSongs({ commit }) {
      await axios
        // .get("http://localhost:8000/music")
        .get("http://192.168.1.233:8000/music")
        .then((response) => {
          commit("SET_SONGS", response.data.data);
          // getters.onLoadSongs;
          commit("ON_LOAD_SONGS");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async addSong({ commit }, payload) {
      await axios
        // .post("http://localhost:8000/music", payload)
        .post("http://192.168.1.233:8000/music", payload)
        .then((response) => {
          commit("ADD_SONG", response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    togglePlay({ state }) {
      console.log("audiosrc", state.currentSong.title);
      console.log("audiosrc", state.currentSong.audio_src);
      if (state.audio.paused) {
        // state.audio.src = state.currentSong.audio_src;
        state.audio.play();
        state.isPlaying = true;
        // console.log(state.isPlaying);
      } else {
        state.audio.pause();
        state.isPlaying = false;
        // console.log(state.isPlaying);
      }
    },
    playNextSong({ commit, state, getters }) {
      if (state.currentSongIndex < getters.songsCount - 1) {
        state.currentSongIndex++;
        state.isPlaying = false;
      } else {
        commit("RESET_TRACK");
      }
      commit("NEXT_SONG");
    },
  },
  modules: {},
});
