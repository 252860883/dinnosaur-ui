import Vue from 'vue'
import App from './App.vue'
// import dinosaur from './lib/index.js'
import dinosaur from 'dinosaur-ui'
Vue.use(dinosaur);
new Vue({
  el: '#app',
  render: h => h(App)
})
