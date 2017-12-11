import Vue from 'vue'
import App from './App.vue'
import dinosaur from './lib/index.js'
Vue.use(dinosaur);
new Vue({
  el: '#app',
  render: h => h(App)
})
