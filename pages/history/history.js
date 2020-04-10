// pages/history/history.js
const { get } = require('../../utils/util')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		shengArray: [
			'陕西省',
			'甘肃省'
		],
		yearsArray: [
			'2017',
			'2018',
			'2019',
		],
		zhuanyeArray: [
			'表演(服装设计与表演方向)',
			'播音与主持艺术',
			'广播电视编导',
			'设计学类'
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getProivnnce()
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
	search: function () {
		if(!this.data.province){
			wx.showToast({
				title: '请选择省',
				icon: 'none'
			})
			return false
		}
		if(!this.data.zy){
			wx.showToast({
				title: '请选择专业',
				icon: 'none'
			})
			return false
		}
		if(!this.data.year){
			wx.showToast({
				title: '请选择年',
				icon: 'none'
			})
			return false
		}
		wx.navigateTo({
			url: `/pages/history-list/history-list?province=${this.data.province}&zy=${this.data.zy}&date=${this.data.year}`
		})
	},
	changeProvince: function (e) {
		const val = e.detail.value
		this.province = val
	},
	changeZy: function (e) {
		const val = e.detail.value
		this.zy = val
	},
	bindPickerChange: function(e) {
		this.setData({
			province: this.data.shengArray[e.detail.value]
		})
	},
	bindPickerChangeZhuanye: function(e) {
		this.setData({
			zy: this.data.zhuanyeArray[e.detail.value]
		})
	},
	bindPickerChangeYear: function(e) {
		this.setData({
			year: this.data.yearsArray[e.detail.value]
		})
	},
	getProivnnce: function () {
		const self = this
		get('/api/getProvince').then(data =>{
			self.setData({
				shengArray: data.data.province,
				yearsArray: data.data.year,
				zhuanyeArray: data.data.zhuanye,
			})
		})
	}
})
