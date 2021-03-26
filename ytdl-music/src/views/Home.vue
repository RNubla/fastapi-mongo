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

    <ul class="my-5">
      <!-- <li><audio-player :music_data="music" /></li> -->
      <li v-for="song in songs" :key="song">
        <audio-player
          :title="song.music_name"
          :artist="song.music_artist"
          :audio_src="song.audio_url"
        />

        <!-- <div
          class="container my-5 bg-gray-300 m-auto rounded-md shadow-md py-3 px-10"
        >
          <span class="m-auto">
            <p>{{ song.music_name }}</p>
            <p>{{ song.music_artist }}</p>
          </span>
          <audio class="container m-auto" controls>
            <source :src="song.audio_url" type="audio/mpeg" />
          </audio>
        </div> -->
        <!-- </li> -->
      </li>
    </ul>

    <!-- <ul class="my-5">
      <li v-for="song in music" :key="song">
        <div
          class="container my-5 bg-gray-300 m-auto rounded-md shadow-md py-3 px-10"
        >
          <span class="m-auto">
            <p>{{ song.music_name }}</p>
            <p>{{ song.music_artist }}</p>
          </span>
          <audio class="container m-auto" controls>
            <source :src="song.audio_url" type="audio/mpeg" />
          </audio>
        </div>
      </li>
    </ul> -->
    <!-- <ul>
      <li v-for="url in music_url" :key="url">
        {{ url }}
      </li>
    </ul> -->
  </div>
</template>

<script>
import AudioPlayer from "../components/AudioPlayer.vue";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    AudioPlayer,
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
      music: [],
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
  mounted() {
    this.$store.dispatch("getSongs");
  },
};
</script>
