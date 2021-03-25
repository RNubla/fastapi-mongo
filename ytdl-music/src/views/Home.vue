<template>
  <div class="home">
    <div>{{ music }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
const axios = require("axios");
export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      music: {},
    };
  },
  methods: {
    getData() {
      axios.get("http://localhost:8000/music").then((response) => {
        this.music = response.data.data;
        console.log(response.data);
        console.log(response.status);
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
