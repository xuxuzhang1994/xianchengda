// pages/rich-text/rich-text.js
const { get } = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  nodes: "",
	  video: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	const self = this
	  wx.getStorage({
		  key: 'url',
		  success (res) {
			  self.getData(res.data)
		  }
	  })
	  this.exam_info = options.exam_info
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
  	const self = this
  	wx.getStorage({
	    key: 'zy_video_pic',
	    success: (res) =>{
		    self.setData({
			    zy_video_pic: res.data
		    })
	    }
    })
	  wx.getStorage({
		  key: 'zy_video',
		  success: (res) =>{
			  self.setData({
				  zy_video: res.data
			  })
		  }
	  })
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
	getData: function (url) {
		const self = this
		get(url).then(data =>{
			if(data.code == 0){
				if(data.data.id == 1){
					self.setData({
						video: 'http://www.goboosoft.com/西安工程大学服装表演系完整版.mp4',
						video_pic: data.data.video_pic
					})
				}
				self.setData({
					nodes: self.exam_info == 1 ? data.data.exam_info.replace(/\<img/g,'<img' +
						' style="width:100%;height:auto;display:block"')
			: data.data.remark.replace(/\<img/g,'<img style="width:100%;height:auto;display:block"'),
					info: data.data,
					id: data.data.id
				})
			}
			console.log({data})
		})
	},
	baoming: function () {
		wx.switchTab({
			url: '/pages/baoming/baoming'
		})
	}
})
