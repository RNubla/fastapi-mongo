<template>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl"
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
          <!-- {{ p_tracks[0].music_name }} -->
          <!-- {{ p_tracks }} -->
          <!-- {{ tracks[0].music_name }} -->
          {{ title }}
        </div>
        <div class="block mt-1 text-md leading-tight font-medium text-gray-500">
          <!-- {{ p_tracks[0].music_artist }} -->
          <!-- {{ p_tracks }} -->
          <!-- {{ tracks }} -->
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
                v-if="!this.isPlaying"
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
</template>

<script>
export default {
  props: {
    title: String,
    artist: String,
    audio_src: String,
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
    };
  },
  methods: {
    togglePlay() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
        this.isPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
        this.isPlaying = false;
      }
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
  created() {
    // console.log("AudioPlayer: ", this.tracks);
    // let vm = this;
    // this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    // this.tracks = this.p_tracks;
    console.log("title: ", this.title);
    this.audio.src = this.audio_src;
    //this.audio.src =
    //"https://r8---sn-8xgp1vo-2iae.googlevideo.com/videoplayback?expire=1616728010&ei=avtcYKHDK4qI2LYP9JO-mAg&ip=100.11.120.125&id=o-AHlGCr54QPJgUjrEc5cI7jGCReluaRAE6bWP3TDD_7L7&itag=251&source=youtube&requiressl=yes&mh=YT&mm=31%2C29&mn=sn-8xgp1vo-2iae%2Csn-ab5szn7y&ms=au%2Crdu&mv=m&mvi=8&pl=16&gcr=us&initcwndbps=1962500&vprv=1&mime=audio%2Fwebm&ns=mrCg7UmhsKIwe9SjLrafuosF&gir=yes&clen=7340368&dur=398.541&lmt=1565320271355570&mt=1616706043&fvip=6&keepalive=yes&fexp=24001373%2C24007246&beids=23886201&c=WEB&txp=2311222&n=gK_WimR83bd6FMEfIj3PM&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgfSCXZIyfBLmWZR6Zy3R_h7kg9_SMoNG-q3q6KpD5TgACIEb7PX6J6bPer7ikl30OaIu4_WcGFOlMD3uT2cssnejf&sig=AOq0QJ8wRAIgOgHLS8a_LY9I8Y50zXZcfE5E-9tI9AZGhZue68WfGWQCIBRJiD3buMTX0vPhQMPwYslR1-kxwbDPeJavSM2hZVA4";
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
  },
};
</script>
