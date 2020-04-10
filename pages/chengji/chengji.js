// pages/chengji/chengji.js
const app = getApp()
const { get } = require('../../utils/util')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		info:{}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.exam_number = options.exam_number
		this.card = options.card
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
	getData: function () {
		const self = this
		get('api/getScore',{
			exam_number: this.exam_number,
			card: this.card,
			openid: app.globalData.openid,
		}).then(data =>{
			if (data.code == 0) {
				self.setData({
					info: data.data,
				})
			}
			console.log({data})
		})
	}
})
