import dateSelect from './date-select/calendar.vue';
import waterFall from './water-mask';

const comment = {
  install: function (Vue, content) {
    Vue.component(dateSelect.name, dateSelect)
    waterFall(content);
  }
}
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}
export default comment