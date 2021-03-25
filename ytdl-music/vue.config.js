// // vue.config.js
module.exports = {
  // options...
  //   devtools: true,
  devServer: {
    proxy: "http://localhost:8000/music",
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
