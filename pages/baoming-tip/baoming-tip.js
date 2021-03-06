// pages/baoming-tip/baoming-tip.js
const {get} = require('../../utils/util')
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
		this.id = options.id
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
		get('api/getContact').then(data =>{
			self.setData({
				info: data.data.bm_notice
			})
			console.log(data)
		})
	},
	checkboxChange: function (e) {
		console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        this.setData({
	        checked: !this.data.checked
        })
	},
	go: function () {
        this.data.checked && wx.navigateTo({
	        url: '/pages/form-step1/form-step1?id=' + this.id
        })
	}
})
