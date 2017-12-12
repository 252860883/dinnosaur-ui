<template>
<div class="din-date">
  <div class="din-input-border " @click="isShowSelect=!isShowSelect">
   <img class="din-icon" :src="require('../../assets/icon.png')" alt="">
    <input type="text" class="din-input" v-model="realDate" readonly >
  </div>
  <transition name="select">
    <div class="din-select ondate" v-if="isShowSelect">
      <div class="din-select-year ondate" >
        <span class="din-select-before ondate" @click="clickBefore" v-if="dateJson[showYear-1] && !isShowYears"><</span>
        <span @click="isShowYears=!isShowYears" class="din-select-year-on ondate">{{showYear}}年</span>
        <span class="din-select-after ondate" @click="clickAfter" v-if="dateJson[showYear+1] && !isShowYears">></span>
      </div>
      <div class="din-content ondate" >
        <div class="din-month ondate" v-if="!isShowYears" @click="selectMonth" >
          <div  v-for="i in 12" :key="i" :class="(dateJson[realYear].indexOf(i)<0)?'din-unmonth ondate':(realMonth==i && realYear==showYear ? 'din-month-select':'din-month-on')" >{{i}}月</div>
        </div>
        <div class="din-years ondate" v-if="isShowYears" @click="selectYear">
          <div v-for="(month,year) in dateJson" :key="year"  name='din-year-on' :class="(showYear==year )?onselcetClass:'ondate'">{{year}}年</div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>
<script>
export default {
  name: "din-date",
  props: ["dateJson"],
  data() {
    return {
      isShowSelect: false,
      isShowYears: false,
      realYear: "",
      showYear: "",
      realMonth: "",
      onselcetClass: "div-years-onselcet ondate"
    };
  },
  created() {},
  mounted() {
    //绑定最后一个数据为当前初始显示数据
    for(let val in this.dateJson) {
      this.realYear = val;
      this.showYear=val;
      this.realMonth = this.dateJson[val][this.dateJson[val].length-1];
    }

    let self = this;
    // 点击其他区域，关闭下拉窗口
    window.addEventListener(
      "click",
      function(e) {
        if (
          !/ondate/.test(e.target.className) &&
          e.target.className != "din-input"
        ) {
          self.isShowSelect = false;
        }
      },
      true
    );
  },
  computed: {
    realDate: {
      get: function() {
        // 将数据返回给父级的数据
        this.$emit("input", this.realYear + "年" + this.realMonth + "月");
        return this.realYear + "年" + this.realMonth + "月";
      }
    },
    monthClass(value) {
      if (this.dateJson[this.realYear].indexOf(1) < 0) {
        return "666";
      } else if (this.realMonth == value) {
        return "din-month-select";
      } else {
        return "din-month-on";
      }
    }
  },
  methods: {
    selectMonth(e) {
      if (e.target.getAttribute("class") == "din-month-on") {
        this.realMonth = e.target.innerHTML.split("月")[0];
        this.isShowSelect = false;
        this.realYear = this.showYear;
      }
    },
    selectYear(e) {
      this.showYear = e.target.innerHTML.split("年")[0];
      this.isShowYears = false;
    },
    // 选择上一个年份
    clickBefore() {
      this.showYear -= 1;
    },
    clickAfter() {
      this.showYear += 1;
    }
  }
};
</script>
<style >
.din-date {
  width: 200px;
  margin: 0 auto;
  position: relative;
  text-align: left;
}
.din-input-border {
  position: relative;
  width: 200px;
}
.din-input-border img {
  position: absolute;
  top: 5px;
  height: 25px;
  margin-left: 5px;
  cursor: pointer;
}
.din-input {
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 3px;
  width: 160px;
  height: 35px;
  padding-left: 40px;
  padding-top: 2px;
  outline: none; /* 取消选中时的边框样式 */
  font-size: 18px;
  color: #5a5e66;
  line-height: 35px;
  cursor: pointer;
}
.din-select {
  position: absolute;
  left: 0;
  height: 208px;
  width: 220px;
  margin-top: 11px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: #fff;
  /* box-shadow: 0 0 5px rgba(100,100,100,.1); */
  text-align: center;
}
.din-select::after {
  position: absolute;
  top: -7px;
  left: 15px;
  content: "";
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid #fff;
  color: #5a5e66;
}
.din-select::before {
  position: absolute;
  top: -9px;
  left: 15px;
  content: "";
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid #ddd;
  border-top: 0;
}
.din-select-year {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.din-select-year span:hover {
  color: #409eff;
}

.din-select-before {
  position: absolute;
  left: 0;
  width: 30px;
}
.din-select-after {
  position: absolute;
  right: 0;
  width: 30px;
  cursor: pointer;
}
.din-month {
  margin: 10px 0;
}
.din-month div {
  width: 33px;
  height: 33px;
  border-radius: 50%;
  text-align: center;
  line-height: 33px;
  margin: 8px;
  box-sizing: border-box;
  display: inline-block;
  color: #5a5e66;
  font-size: 12px;
  cursor: pointer;
}
.din-month .din-month-on:hover {
  color: #409eff;
}

.din-month .din-unmonth {
  background: #eee;
  color: #aaa;
  cursor: not-allowed;
}
.din-month .din-month-select {
  background: #409eff;
  color: #fff;
  text-align: center;
}
.din-years {
  width: 210px;
  margin: 0 auto;
}
.din-years div {
  cursor: pointer;
  font-size: 13px;
  float: left;
  width: 50px;
  margin: 15px 10px;
}
.din-years div:hover,
.div-years-onselcet {
  color: #409eff;
}

.select-enter,
.select-leave-to {
  opacity: 0;
  height: 0;
}
.select-enter-active,
.select-leave-active {
  transition: all 0.3s;
}
</style>

