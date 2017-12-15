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
>日期选择器，绑定对象自定义显示年份和月份，实现部分年月可选  

![image](http://wx1.sinaimg.cn/mw690/a73bc6a1ly9fmh6s9hoebj20fq08ajt4.jpg)  

实例：
```js
<din-date :dateJson="dateJson" v-model="realDate" ></din-date>

data(){
  return{
     dateJson: {
        2016: [1, 3, 5, 8, 12],
        2017: [1, 2, 3, 4, 6, 7, 8, 10, 12],
        2018: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12],
        2019: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12],
        2020: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12],
        2021: [1, 2, 3, 4, 6]
      }，
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
