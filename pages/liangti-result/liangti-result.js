// pages/liangti-result/liangti-result.js
const { get } = require('../../utils/util')
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		info: {name:'hahahha'}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 清空缓存数据
		this.setData({
			info: {},
		})
		// Object.assign(this.$data, this.$options.data());
		this.getInfo()
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
	getInfo: function () {
		console.log("详情数据加载")
		const self = this
		get('/api/searchlt',{
			openid: app.globalData.openid,
        }).then(data =>{
					console.log(data.data.card_number)
			self.setData({
				info: data.data,
			})
		})
	},
	submit: function () {
		wx.switchTab({
			url: '/pages/mine/mine'
		})
	}
})
