<template>
  <div class="home">
    <!-- <div v-for="song in music" :key="song">{{ music }}</div> -->
    <!-- <div>{{ music[0].original_url }}</div> -->
    <form method="post" @submit.prevent="addSong">
      <p>
        <label for="">Song Name</label>
        <input type="text" v-model="input.music_name" />
      </p>
      <p>
        <label for="">Artist Name</label>
        <input type="text" v-model="input.music_artist" />
      </p>
      <p>
        <label for="">Youtube URL</label>
        <input type="text" v-model="input.original_url" />
      </p>
      <p>
        <input type="submit" value="Submit" name="" id="" />
      </p>
    </form>
    <ul class="my-5">
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
        <!-- {{ song.audio_url }} -->
      </li>
    </ul>
    <!-- <ul>
      <li v-for="url in music_url" :key="url">
        {{ url }}
      </li>
    </ul> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
const axios = require("axios");
// const ytdl = require("ytdl-core");
export default {
  name: "Home",
  components: {
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
      ytdl_info: [],
    };
  },
  methods: {
    async getData() {
      axios
        .get("http://localhost:8000/music")
        .then((response) => {
          this.music = response.data.data;
          // console.log(response.status);
          this.getSongURL();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    async addSong() {
      axios
        .post("http://localhost:8000/music", this.input)
        .then((res) => {
          console.log(res);
          this.getData();
          this.input = "";
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    async getSongURL() {
      // this.music_url = ytdl.getBasicInfo(this.music[0].original_url);
      this.music.forEach((element) => {
        this.music_url.push(element.original_url);
      });
    },
  },
  mounted() {
    this.getData();
    console.log(this.music_url);
    // this.ytdl_info();
  },
};
</script>
