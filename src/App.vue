<template>
  <div id="app">
    <img src="./assets/logo.png">
    <din-date :dateJson="dateJson" v-model="realDate"></din-date>
    {{realDate}}
  </div>
</template>

<script>
import dinosaur from "./lib/index.js";
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      dateJson: {
        2016: [1, 3, 5, 8, 12],
        2017: [1, 2, 3, 4, 6, 7, 8, 10, 12],
        2018: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12],
        2019: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12],
        2020: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12],
        2021: [1, 2, 3,9]
      },
      realDate:""
    };
  },
  created() {}
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
