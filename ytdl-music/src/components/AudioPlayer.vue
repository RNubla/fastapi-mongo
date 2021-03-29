<template>
  <div class="flex-inline">
    <div
      class="max-w-md mx-auto my-10 bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl"
    >
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img
            class="h-48 w-full object-cover md:w-48"
            src="https://tailwindcss.com/img/card-top.jpg"
            alt=""
          />
        </div>
        <div class="p-4 flex flex-col justify-center">
          <div class="uppercase tracking-wide text-sm font-semibold">
            {{ title }}
          </div>
          <div
            class="block mt-1 text-md leading-tight font-medium text-gray-500"
          >
            {{ artist }}
          </div>
        </div>
        <div class="p-4">
          <!-- Buttons -->
          <div class="flex justify-evenly mx-auto px-8">
            <!-- Rewind -->
            <div class="mx-4">
              <div
                class="rounded-full h-12 w-12 bg-white shadow-inner flex items-center justify-center"
              >
                <svg
                  class="h-8 w-8 fill-current text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                  />
                </svg>
              </div>
            </div>
            <!-- Play Button -->
            <div class="mx-4">
              <div
                @click.prevent="togglePlay()"
                class="rounded-full h-16 w-16 bg-white shadow-inner flex items-center justify-center"
              >
                <svg
                  v-if="!this.$store.state.isPlaying"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <!-- Forward -->
            <div class="mx-4">
              <div
                @click="nextSong"
                class="rounded-full h-12 w-12 bg-white shadow-inner flex items-center justify-center"
              >
                <svg
                  class="fill-current text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-gray-200"
      mb-12
      rounded-xl
      shadow-2xl
      overflow-hidden
      inline-flex
    >
      <ul class="">
        <li v-for="song in songs" :key="song">
          {{ song.music_name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const { mapGetters, mapActions } = require("vuex");
export default {
  computed: {
    ...mapGetters({
      title: "getCurrentSongTitle",
      artist: "getCurrentSongArtist",
      _og: "getCurrentSongOriginalURL",
      id: "getCurrentSongID",
      _audio: "getCurrentSongAudio",
      songs: "getListOfSongs",
    }),
  },
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duation: null,
      currentTime: null,
      isTimerPlaying: false,
      isPlaying: false,
      tracks: null,
      audioSrc: this._audio,
    };
  },

  created() {
    this.fetchSongs();
  },
  methods: {
    ...mapActions({
      togglePlay: "togglePlay",
      fetchSongs: "fetchSongs",
    }),
    // togglePlay() {

    // if (this.audio.paused) {
    //   this.audio.play();
    //   this.isTimerPlaying = true;
    //   this.isPlaying = true;
    // } else {
    //   this.audio.pause();
    //   this.isTimerPlaying = false;
    //   this.isPlaying = false;
    // }
    // },
    nextSong() {
      // this.audio.src = this._audio;
      this.$store.dispatch("playNextSong");
    },
    /* generateTime() {
      let width = (100 / this.audio.duation) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duation / 60);
      let dursec = Math.floor(this.audio.duation - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duation = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    }, */
    /* updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    }, */
    /* prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    }, */
    /* nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }, */
  },
  // beforeMount() {
  //   this.audio = new Audio();
  //   this.audio.src = this.audioSrc;
  // },
  // created() {
  // let vm = this;
  // this.currentTrack = this.tracks[0];
  // this.audio = new Audio();
  // this.tracks = this.p_tracks;
  // console.log("title: ", this.title);
  // this.audio.src = this.audioSrc;
  // this.audio.src = this.$store.getters.getCurrentSong;
  // this.audio.src = this.getCurrentSongAudio;
  /* this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function () {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      this.isTimerPlaying = true;
    }; */
  // },
};
</script>
