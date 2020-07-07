// pages/about-list1/about-list1.js
const { get } = require('../../utils/util')

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
    const { id, type } = options
    this.getList({
      pid: id,
      type
    })
    this.type = type
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

  getList: function(params) {
    const self = this
    if(this.type != 5){
      get('api/getLists',params).then(data => {
        self.setData({
          list: data.data
        })
      })
    }else{
      get('/api/getzhuanyev2').then(data => {
        self.setData({
          list: data.data
        })
      })
    }
  },
  goDetail: function(e){
    const { item } = e.currentTarget.dataset
    console.log({
      item
    })
    if(item.is_children){
      wx.navigateTo({
        url: `../about-list4/about-list4?id=${item.id}&type=${this.type}`
      })
    }else{
      if(this.type == 5){
        wx.navigateTo({
          url: '../rich-text/rich-text?exam_info=0'
        })
        wx.setStorage({
          key: "url",
          data: 'api/getzhuandesv2?id=' + item.id
        })
      }else{
        wx.navigateTo({
          url: '../rich-text/rich-text?exam_info=0'
        })
        wx.setStorage({
          key: "url",
          data: 'api/getDes?id=' + item.id
        })
      }
    }
  }
})