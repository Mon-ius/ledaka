var calendar = require('../../utils/calendar/calendar.js')
var util = require('../../utils/util.js')
var date = new Date()
var app = getApp()
var myDate = new Date()  
var moderndate = myDate.toLocaleDateString()
Page({
  data: {
    avaliable_years: util.range(2000, 2031).map(x => x + '年'),
    avaliable_months: util.range(1, 13).map(x => x + '月'),
    // text:"这是一个页面"
    cal1: {
      calendar: {
        weeks: [
          ["1", " 2", "3", " 4", " 5", " 6", " 7"],
          [" 8", " 9", "10", "11", "12", "13", "14"],
          [15, 16, 17, 18, 19, 20, 21],
          [22, 23, 24, 25, 26, 27, 28],
        ]
      }
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.date = new Date()
    this.cal = new calendar.Calendar()
    let current_year = this.date.getFullYear()
    let current_month = this.date.getMonth()+1
    let dates = this.cal.monthdays2calendar(current_year, current_month)
    console.log(this.cal.getweekheader())
    console.log('dates', dates)
    //为当前日期添加样式
    var X=0
    var i
    for(X in dates){
      for(i in dates[X]){
          var day=dates[X]
        
        if(day[i][0]==date.getDate()){

          day[i][9]="color:white;background-color:#4bc2d1;"
 
        }
      }
    }
    this.setData({
      cal1: {
        year: this.date.getFullYear(),
        month: this.date.getMonth() + 1,
        calendar: {
          days: this.cal.getweekheader(),
          weeks: dates
        }
      }
    })
  
  },
  onReady: function () {
    // 页面渲染完成
    var day = date.getDate()
    // var c=document.getElementsByClassName('mute1')
    // c.style.backgroundColor="#FFCC8"

  },
  onShow: function () {
    // 页面显示
    var day = date.getDate()
       


    // var c=document.getElementsByClassName('mute1')
    // c.style.backgroundColor="#FFCC8"
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  change_calendar_view: function (year, month) {
    let cal = {
      year: year,
      month: month,
      calendar: {
        days: this.cal.getweekheader(),
        weeks: this.cal.monthdays2calendar(year, month)
      }
    }
    console.log(cal)
    console.log(date.getYear())
    var dates=cal.calendar.weeks  
    var X=0
    var i
    for(X in dates){
      for(i in dates[X]){
          var day=dates[X]
        if(day[i][0]==date.getDate()){
          day[i][9]="color:white;background-color:#4bc2d1;"
        }
      }
    }
    this.setData({cal1:cal})
  },
  premonth: function (e) {
    let month = (this.data.cal1.month - 1)
    let year_diff = (month == 0) ? -1 : 0
    month = (month == 0) ? 12 : month
    this.change_calendar_view(this.data.cal1.year + year_diff, month)
  },
  nextmonth: function (e) {
    let month = (this.data.cal1.month + 1)
    let year_diff = parseInt(month /13)
    month = (this.data.cal1.month % 12) + 1
    this.change_calendar_view(this.data.cal1.year + year_diff, month)
  },
  yearchange: function (e) {
    var year = this.data.avaliable_years[e.detail.value]
    var year_number = parseInt(year.replace('年', ''))
    this.change_calendar_view(year_number, this.data.cal1.month)
    console.log('年份变化：', year)
  },
  monthchange: function (e) {
    var month = this.data.avaliable_months[e.detail.value]
    var month_number = parseInt(month.replace('月', ''))
    this.change_calendar_view(this.data.cal1.year, month_number)
  },
  daytap: function (e) {
    let pos = e.currentTarget.dataset.idx.split(',')
    let week = pos[0], day = pos[1]
    let dat = this.data.cal1.calendar.weeks[week][day]
    console.log('day clicked', dat)
    wx.setStorage({
    key:"weekdate",
    data:util.formatTime(dat[2])
  })
  wx.navigateBack({
  delta: 1
})
  }
})
