// pages/mine/mine.js
const {get} = require('../../utils/util')
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const self = this
		wx.getSetting({
			success (res){
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					wx.getUserInfo({
						success: function(res) {
							self.setData({
								userInfo: res.userInfo
							})
						}
					})
				}
			}
		})
		this.getData()
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
			key: 'islook',
			success (res) {
				self.setData({
					islook: res.data
				})
				self.getData()
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
	goStatus: function () {
		wx.navigateTo({
			url: `/pages/status/status`,
		})
	},
	goCard: function () {
		wx.navigateTo({
			url: `/pages/save-card/save-card`,
		})
	},
	goChengji: function () {
		const src = wx.getStorageSync('search_url')
		wx.navigateTo({
			url: `/pages/web-view/web-view?src=${src}` ,
		})
	},
	goFapiao: function () {
		wx.navigateTo({
			url: `/pages/fapiao/fapiao`,
		})
	},
	goLianxi: function () {
		wx.navigateTo({
			url: `/pages/lianxi/lianxi`,
		})
	},
	goHelp: function () {
		wx.navigateTo({
			url: `/pages/help/help`,
		})
	},
	goTianbao: function () {
		wx.navigateTo({
			url: `/pages/liangti-form/liangti-form`,
		})
	},
	goChaxun: function () {
		wx.navigateTo({
			url: `/pages/liangti-result/liangti-result`,
		})
	},
	bindGetUserInfo (e) {
		this.setData({
			userInfo: e.detail.userInfo
		})
	},
	getData: function () {
		const self = this
		get('/api/getinfo',{
			openid: app.globalData.openid,
		}).then(data =>{
			if(data.code == 0){
				self.setData({
					bm_state: data.data.bm_state,
				})
			}
			console.log({data})
		})
	}
})
