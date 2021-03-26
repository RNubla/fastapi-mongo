import { createStore } from "vuex";
const axios = require("axios");
export default createStore({
  state: {
    songs: [],
    inputSong: {},
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
  },
  getters: {
    getUpdatedSongs: (state) => {
      return state.songs;
    },
  },
  actions: {
    async getSongs({ commit }) {
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
  },
  modules: {},
});
