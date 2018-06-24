# dinosaur-ui
>封装一些常用的组件      
Encapsulate some common components.

引入
<pre>
npm install dinosaur-ui

import dinosaur from 'dinosaur-ui'
Vue.use(dinosaur);
</pre>
- [dinosaur-ui](#dinosaur-ui)
  - [din-date](#-din-date)

## -din-date
>日期选择器，绑定对象自定义显示年份和月份，实现部分年月可选,部分月份不可选,多种显示格式，优化过渡效果，自适应窗口位置

![image](http://wx1.sinaimg.cn/mw690/a73bc6a1ly9fmh6s9hoebj20fq08ajt4.jpg)  

实例：
```js
<din-date :dateJson="dateJson" v-model="realDate" ></din-date>

data(){
  return{
     /**
       * year：相应的年份列表
       * month：二维数组，对应年份的月份
       * currentDate：默认显示的时间，第一个参数为年，第二个参数为月份
       * dateType：显示时间的格式，0: 2017年11月(默认) || 1: 2017/11 || 2: 2017-11
       */
    dateJson = {
      year: [2014, 2016, 2017, 2018],
      month: [
        [1, 2, 3, 5, 8, 9, 10],
        [1, 2, 3, 5, 8, 10],
        [1, 2, 3, 5, 8, 9, 10],
        [1, 2, 3, 5, 8, 10]
      ],
      currentDate: [2017, 5],
      dateType: 0 
    }
     realDate:""
   }
}

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
