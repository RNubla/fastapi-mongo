<template>
  <div class="container bg-gray-200 h-screen mx-auto max-h-full mx-auto">
    <div class="home">
      <form class="flex" method="post" @submit.prevent="addSong">
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
    </div>
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
  methods: {
    addSong() {
      console.log(this.input);
      this.$store.dispatch("addSong", this.input);
    },
  },
  // created() {
  //   this.$store.dispatch("fetchSongs");
  // },
  mounted() {
    // this.$store.dispatch("getSongs");
  },
};
</script>
