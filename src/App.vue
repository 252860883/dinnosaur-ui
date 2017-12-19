<template>
  <div id="app">
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
      dateJson: {},
      realDate: ""
    };
  },
  created() {
    let self = this;
    setTimeout(() => {
      /**
       * year：相应的年份列表
       * month：二维数组，对应年份的月份
       * currentDate：默认显示的时间，第一个参数为年，第二个参数为月份
       * dateType：显示时间的格式，0: 2017年11月(默认) || 1: 2017/11 || 2: 2017-11
       */
    self.dateJson = {
      year: [2014, 2016, 2017, 2018],
      month: [
        [1, 2, 3, 5, 8, 9, 10],
        [1, 2, 3, 5, 8, 10],
        [1, 2, 3, 5, 8, 9, 10],
        [1, 2, 3, 5, 8, 10]
      ],
      currentDate: [2017, 5],
      dateType: 0 
    };
    }, 1000);
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
  margin-left: 700px;
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
