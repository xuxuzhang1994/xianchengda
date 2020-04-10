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
		wx.showModal({
			title:'提示',
			content: '量体数据填报及照片上传  4月14号开通，请考生提前准备照片，照片要求：考生穿着分体式泳装，拍摄彩色照片五张，分别为前全身、侧全身、后全身、前上半身、脸部特写。照片需保证真实性、原始性，不得进行后期加工或修改，照片要求分别率为4800×3600以上，每张照片不得超过10M，按照要求上传。',
			icon: 'none'
		})
		// wx.navigateTo({
		// 	url: `/pages/liangti-form/liangti-form`,
		// })
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
