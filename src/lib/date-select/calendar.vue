<template>
<div class="din-date">
  <div class="din-input-border " @click="isShowSelect=!isShowSelect">
    <svg  t="1513051136116" class="din-icon" style="" viewBox="0 0 1178 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1599" xmlns:xlink="http://www.w3.org/1999/xlink" width="230.078125" height="200"><path d="M955.732 921.6h-716.8c-30.72 0-51.2-20.48-51.2-51.2v-665.6c0-30.72 20.48-51.2 51.2-51.2h102.4c0-30.72 20.48-51.2 51.2-51.2s51.2 20.48 51.2 51.2h307.2c0-30.72 20.48-51.2 51.2-51.2s51.2 20.48 51.2 51.2h102.4c30.72 0 51.2 20.48 51.2 51.2v665.6c0 30.72-20.48 51.2-51.2 51.2zM955.732 358.4h-716.8v-51.2h716.8v-102.4h-716.8v665.6h716.8v-512zM392.532 460.8c30.72 0 51.2 20.48 51.2 51.2s-20.48 51.2-51.2 51.2-51.2-20.48-51.2-51.2 20.48-51.2 51.2-51.2zM392.532 665.6c30.72 0 51.2 20.48 51.2 51.2s-20.48 51.2-51.2 51.2-51.2-20.48-51.2-51.2 20.48-51.2 51.2-51.2zM597.332 460.8c30.72 0 51.2 20.48 51.2 51.2s-20.48 51.2-51.2 51.2-51.2-20.48-51.2-51.2 20.48-51.2 51.2-51.2zM597.332 665.6c30.72 0 51.2 20.48 51.2 51.2s-20.48 51.2-51.2 51.2-51.2-20.48-51.2-51.2 20.48-51.2 51.2-51.2zM802.132 460.8c30.72 0 51.2 20.48 51.2 51.2s-20.48 51.2-51.2 51.2-51.2-20.48-51.2-51.2 20.48-51.2 51.2-51.2z" p-id="1600" fill="#dddddd"></path></svg>
    <input type="text" class="din-input" v-model="realDate" readonly >
  </div>
  <transition name="select">
    <div :class="dinSelect" v-if="isShowSelect">
      <div class="din-select-year ondate" >
        <span class="din-select-before ondate" @click="clickBefore" v-if="dateJson.year[showYearIndex-1] && !isShowYears"><</span>
        <span @click="isShowYears=!isShowYears" class="din-select-year-on ondate" >{{dateJson.year[showYearIndex]}}年</span>
        <span class="din-select-after ondate" @click="clickAfter" v-if="dateJson.year[showYearIndex+1]  && !isShowYears">></span>
      </div>
      <div class="din-content ondate" >
        <!-- 月份显示 -->
        <transition name="select">
          <div class="din-month ondate" v-if="!isShowYears" @click="selectMonth" >
            <div  v-for="i in 12" :key="i" :class="(dateJson.month[showYearIndex].indexOf(i)<0)?'din-unmonth ondate':(dateJson.month[showYearIndex][realMonthIndex]==i && realYearIndex==showYearIndex ? 'din-month-select':'din-month-on')" >{{i}}月</div>
          </div>
        </transition>

        <!-- 年份显示 -->
        <transition name="select">
          <div class="din-years ondate" v-if="isShowYears" @click="selectYear">
            <div v-for="(year,index) in dateJson.year" :key="year"  name='din-year-on' :class="(realYearIndex==index )?onselcetClass:'ondate'">{{year}}年</div>
          </div>
        </transition>

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
      isShowDate: true,
      realYear: 0,
      showYearIndex: 0,
      realYearIndex: 0,
      showYear: 0,
      realMonthIndex: 0,
      showMonthIndex: 0,
      realMonth: 0,
      onselcetClass: "div-years-onselcet ondate",
      dinSelect: "din-select  ondate",
      currentDate: false //初始化显示的时间
    };
  },
  created() {},
  watch: {
    dateJson(dateJson) {
      //如果没有设置当前显示的月份，绑定最后一个数据为当前初始显示数据
      // 如果没有设置或者设置错误当前显示的月份，绑定最后一个数据为当前初始显示数据
      try {
        this.realYearIndex = dateJson.year.indexOf(dateJson.currentDate[0]);
        this.showYearIndex = dateJson.year.indexOf(dateJson.currentDate[0]);
        this.realMonthIndex = dateJson.month[this.realYearIndex].indexOf(
          dateJson.currentDate[1]
        );
        if (this.realMonthIndex < 0 || this.realYearIndex < 0) {
          throw Error;
        }
      } catch (e) {
        this.realYearIndex = dateJson.year.length - 1;
        this.showYearIndex = dateJson.year.length - 1;
        this.realMonthIndex =
          this.dateJson.month[this.realYearIndex].length - 1;
      }
    },
    // 如果页面关闭则还原显示
    isShowSelect(val) {
      if (!val) {
        this.showYearIndex = this.realYearIndex;
      }
    }
  },
  created() {
    // console.log(this.dateJson);
    // 如果没有设置或者设置错误当前显示的月份，绑定最后一个数据为当前初始显示数据
    // if (!this.dateJson.year) {
    //   this.dateJson = {
    //     year: [0,0],
    //     month: [0,0]
    //   };
    // }
  },
  mounted() {
    let self = this;
    if (this.dateJson.year) {
      try {
        this.realYearIndex = this.dateJson.year.indexOf(
          this.dateJson.currentDate[0]
        );
        this.showYearIndex = this.dateJson.year.indexOf(
          this.dateJson.currentDate[0]
        );
        this.realMonthIndex = this.dateJson.month[this.realYearIndex].indexOf(
          this.dateJson.currentDate[1]
        );
        if (this.realMonthIndex < 0 || this.realYearIndex < 0) {
          throw Error;
        }
      } catch (e) {
        this.realYearIndex = this.dateJson.year.length - 1;
        this.showYearIndex = this.dateJson.year.length - 1;
        this.realMonthIndex =
          this.dateJson.month[this.realYearIndex].length - 1;
      }
    }

    // 点击其他区域，关闭下拉窗口
    window.addEventListener(
      "click",
      function(e) {
        if (
          !/ondate/.test(e.target.className) &&
          e.target.className != "din-input" &&
          e.target.tagName != "svg"
        ) {
          self.isShowSelect = false;
        }
      },
      true
    );

    // 下拉区域的判断
    let inputEle = document.getElementsByClassName("din-input")[0];
    let inputRight = inputEle.getBoundingClientRect().x,
      inputTop = inputEle.getBoundingClientRect().y;

    if (
      window.innerHeight - inputTop < 250 &&
      window.innerWidth - inputRight > 250
    ) {
      this.dinSelect = "din-select-up  ondate";
    }
    if (
      window.innerHeight - inputTop < 250 &&
      window.innerWidth - inputRight <= 250
    ) {
      this.dinSelect = "din-select-up-right  ondate";
    }
    if (
      window.innerHeight - inputTop >= 250 &&
      window.innerWidth - inputRight <= 250
    ) {
      this.dinSelect = "din-select-right  ondate";
    }
  },
  computed: {
    realDate: {
      get: function() {
        // 将数据返回给父级的数据
        let yearType = "年",
          monthType = "月";
        if (this.dateJson.dateType != undefined) {
          switch (this.dateJson.dateType) {
            case 0:
              break;
            case 1:
              yearType = " - ";
              monthType = "";
              break;
            case 2:
              yearType = " / ";
              monthType = "";
              break;
          }
        }
        if (this.dateJson.year) {
          this.$emit(
            "input",
            this.dateJson.year[this.realYearIndex] +
              yearType +
              this.dateJson.month[this.realYearIndex][this.realMonthIndex] +
              monthType
          );
          return (
            this.dateJson.year[this.realYearIndex] +
            yearType +
            this.dateJson.month[this.realYearIndex][this.realMonthIndex] +
            monthType
          );
        }
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
        this.realMonthIndex = this.dateJson.month[this.showYearIndex].indexOf(
          parseInt(e.target.innerHTML.split("月")[0])
        );
        this.isShowSelect = false;
        this.realYearIndex = this.showYearIndex;
      }
    },
    selectYear(e) {
      this.showYearIndex = this.dateJson.year.indexOf(
        parseInt(e.target.innerHTML.split("年")[0])
      );
      this.isShowYears = false;
    },
    // 选择上一个年份
    clickBefore() {
      this.showYearIndex--;
    },
    clickAfter() {
      this.showYearIndex++;
    }
  }
};
</script>
<style >
.din-date {
  width: 160px;
  margin: 0 auto;
  position: relative;
  text-align: left;
}
.din-input-border {
  position: relative;
  /* width: 160px; */
}
.din-input-border svg {
  position: absolute;
  top: 5px;
  left: 0;
  height: 25px;
  width: 25px;
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

.din-select-right {
  position: absolute;
  right: 0;
  height: 208px;
  width: 220px;
  margin-top: 11px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: #fff;
  /* box-shadow: 0 0 5px rgba(100,100,100,.1); */
  text-align: center;
}
.din-select-right::after {
  position: absolute;
  top: -7px;
  right: 15px;
  content: "";
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid #fff;
  color: #5a5e66;
}
.din-select-right::before {
  position: absolute;
  top: -9px;
  right: 15px;
  content: "";
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid #ddd;
  border-top: 0;
}

.din-select-up {
  position: absolute;
  left: 0;
  bottom: 50px;
  height: 208px;
  width: 220px;
  margin-top: 11px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: #fff;
}
.din-select-up::after {
  content: "6";
  position: absolute;
  bottom: -6px;
  left: 15px;
  content: "";
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #fff;
  color: #5a5e66;
}
.din-select-up::before {
  position: absolute;
  bottom: -8px;
  left: 15px;
  content: "";
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #ddd;
}

.din-select-up-right {
  position: absolute;
  right: 0;
  bottom: 50px;
  height: 208px;
  width: 220px;
  margin-top: 11px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: #fff;
}
.din-select-up-right::after {
  content: "6";
  position: absolute;
  bottom: -6px;
  right: 15px;
  content: "";
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #fff;
  color: #5a5e66;
}
.din-select-up-right::before {
  position: absolute;
  bottom: -8px;
  right: 15px;
  content: "";
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #ddd;
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
.din-content {
  position: relative;
}
.din-month {
  margin: 10px 0;
  position: absolute;
  /* top: 10px; */
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
}
.select-enter-active,
.select-leave-active {
  transition: all 0.3s;
}
</style>

