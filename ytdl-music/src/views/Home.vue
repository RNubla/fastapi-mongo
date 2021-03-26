<template>
  <div class="home bg-gray-300">
    <form method="post" @submit.prevent="addSong">
      <p>
        <label for="">Song Name</label>
        <input type="text" v-model="input.music_name" required />
      </p>
      <p>
        <label for="">Artist Name</label>
        <input type="text" v-model="input.music_artist" required />
      </p>
      <p>
        <label for="">Youtube URL</label>
        <input type="text" v-model="input.original_url" required />
      </p>
      <p>
        <input type="submit" value="Submit" name="" id="" />
      </p>
    </form>
    <audio-player />

    <!-- <ul class="my-5">
      <li v-for="song in songs" :key="song">
        <audio-player
          :title="song.music_name"
          :artist="song.music_artist"
          :audio_src="song.audio_url"
        />
      </li>
    </ul> -->
  </div>
</template>

<script>
// import AudioPlayerNew from "../components/AudioPlayer-new.vue";
import AudioPlayer from "../components/AudioPlayer.vue";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    AudioPlayer,
    // AudioPlayerNew,
    // HelloWorld,
  },
  data() {
    return {
      input: {
        music_name: "",
        music_artist: "",
        original_url: "",
        audio_url: "",
      },
      track: [],
      errors: [],
      music_url: [],
    };
  },
  computed: {
    songs() {
      return this.$store.state.songs;
    },
  },
  methods: {
    addSong() {
      console.log(this.input);
      this.$store.dispatch("addSong", this.input);
    },
  },
  created() {
    this.$store.dispatch("fetchSongs");
  },
  mounted() {
    // this.$store.dispatch("getSongs");
  },
};
</script>
