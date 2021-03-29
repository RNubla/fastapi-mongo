// // vue.config.js
module.exports = {
  // options...
  //   devtools: true,
  devServer: {
    // host: "http://localhost:8080",
    // public: "localhost:8080",
    // proxy: "http://localhost:8000/music",
    proxy: "http://192.168.1.233:8000/music",
    // proxy: {
    //   "one/": {
    //     target: "http://localhost:8000/music",
    //   },
    //   "two/": {
    //     target: "http://192.168.1.233/music",
    //   },
    // },
  },
};
// module.exports = {
//   devServer: {
//     proxy: {
//       "/music": {
//         target: "http://localhost:8000/music",
//         changeOrigin: true,
//         pathRewrite: {
//           "^/music": "",
//         },
//       },
//     },
//   },
// };
