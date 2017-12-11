import dateSelect from './date-select/calendar.vue';


const comment = {
    install: function(Vue) {
      Vue.component(dateSelect.name, dateSelect)
    }
  }
  // 这里的判断很重要
  if (typeof window !== 'undefined' && window.Vue) { 
      window.Vue.use(comment) 
  }
  export default comment
