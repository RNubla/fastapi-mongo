import { createStore } from "vuex";
const axios = require("axios");
export default createStore({
  state: {
    songs: [],
    currentSongIndex: 0,
    currentSong: {
      title: null,
      artist: null,
      audio_src: null,
      original_url: null,
      id: null,
    },
  },
  mutations: {
    SET_SONGS(state, songs) {
      state.songs = songs;
      console.log("SET_SONG", state.songs);
    },
    ADD_SONG(state, payload) {
      state.songs.push(payload);
      console.log("ADD_SONG", state.songs);
    },
    NEXT_SONG(state, increment) {
      // console.log(state.songs[state.currentSongIndex].audio_url);
      state.currentSongIndex += increment;
      // Title
      state.currentSong.title = state.songs[state.currentSongIndex].music_name;
      // Artist
      state.currentSong.artist =
        state.songs[state.currentSongIndex].music_artist;

      state.currentSong.audio_src =
        state.songs[state.currentSongIndex].audio_url;

      state.currentSong.original_url =
        state.songs[state.currentSongIndex].original_url;

      state.currentSong.id = state.songs[state.currentSongIndex].id;

      // console.log(state.songs[state.currentSongIndex].audio_url);
    },
  },
  getters: {
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
        .get("http://localhost:8000/music")
        .then((response) => {
          commit("SET_SONGS", response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async addSong({ commit }, payload) {
      await axios
        .post("http://localhost:8000/music", payload)
        .then((response) => {
          commit("ADD_SONG", response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    playNextSong({ commit, state, getters }) {
      if (state.currentSongIndex < getters.songsCount - 1) {
        commit("NEXT_SONG", 1);
      } else {
        state.currentSongIndex = 0;
      }
    },
  },
  modules: {},
});
