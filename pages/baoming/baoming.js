// pages/baoming/baoming.js
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
		this.getVersion()
		this.getCanRegiser()
		this.getNotice()
		this.getMoreState()
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
	go: function (e) {
	  const type = e.currentTarget.dataset.type
	  const id = e.currentTarget.dataset.id
        if(type == 3){
        	if(this.data.canRegiser){
		        wx.navigateTo({
			        url: `/pages/baoming-tip/baoming-tip`,
		        })
	        }else {
        		wx.showToast({
			        title: this.data.msg,
			        icon: 'none'
		        })
	        }
        }
        if(type == 2){
	        if(this.data.canRegiser){
		        wx.setStorage({
			        key: "url",
			        data: '/api/getSchoolWin'
		        })
		        wx.navigateTo({
			        url: '../rich-text/rich-text'
		        })
	        }else {
		        wx.showToast({
			        title: this.data.msg,
			        icon: 'none'
		        })
	        }
        }
        if(type == 4){
        	if(!this.data.more){
		        wx.showToast({
			        title: this.data.moremsg,
			        icon: 'none'
		        })
        		return
	        }
	        wx.setStorage({
		        key: "url",
		        data: '/api/getArticleDes?id=' + id
	        })
	        wx.navigateTo({
		        url: '../rich-text/rich-text'
	        })
        }
	},
	getVersion: function () {
		const self = this
		get('/api/getVersion',{
			version: 1
		}).then(data =>{
			if(data.code == 0){
				let is_show = data.data.is_show
				self.setData({
					is_show
				})
			}
		})
	},
	getCanRegiser: function () {
		const self = this
		get('/api/getBaomingState').then(data =>{
			if(data.code == 0){
				let canRegiser = data.data.is_show
				let msg = data.data.msg
				self.setData({
					canRegiser,
					msg
				})
			}
		})
	},
	getMoreState: function () {
		const self = this
		get('/api/getMoreState').then(data =>{
			if(data.code == 0){
				let more = data.data.is_show
				let moremsg = data.data.msg
				self.setData({
					more,
					moremsg
				})
			}
		})
	},
	getNotice: function () {
		const self = this
		get('/api/getArticle').then(data =>{
			if(data.code == 0){
				data.data.lists.length = Object.keys(data.data.lists).length
				let noticeList = Array.from(data.data.lists)
				self.setData({
					noticeList
				})
			}
		})
	}
})
