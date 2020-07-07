// pages/xianchengda/xianchengda.js
const { get } = require('../../utils/util')
const app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getData()
    this.setData({
      lng: app.globalData.map.lng,
      lat: app.globalData.map.lat,
      scale: app.globalData.map.bili,
      markers: [
        // {
        //   // iconPath: poiKeywords[keywordIndex].logo,
				// 	id: item.id,
				// 	latitude: item.location.lat,
				// 	longitude: item.location.lng,
				// 	width: 19,
				// 	height: 22
        // }
      ]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getData: function(){
    const self = this
    get('/api/getMap').then(data => {
      self.setData({
        markers: data.data.map(item => {
          return {
            ...item,
            iconPath: '/images/zuobiao.png',
            id: item.id,
            latitude: item.lat,
            longitude: item.lng,
            width: 50,
            height: 40,
          }
        })
      })
      console.log({
        data
      })
    })
  },
  markertap: function(e){
    const { markers } = this.data
    const mark = markers.find(item => {
      return item.id == e.markerId
    })
    
    wx.navigateTo({
      url: '../video-play/video-play?src=' + mark.file_url
    })
  }
})